---
title: "ChopChopGo: Bringing Sigma-Based Threat Hunting to Linux Forensics"
date: "2026-03-09"
tags: ["DFIR", "Linux", "Sigma Rules", "Threat Hunting", "Forensics", "Open Source"]
excerpt: "Why I built ChopChopGo, how it works under the hood, and how you can use it to rapidly triage compromised Linux systems using Sigma detection rules. Think Chainsaw, but for Linux."
readingTime: "10 min read"
---

## The Problem

If you've ever done incident response on a Linux box, you know the drill. You pull syslog, auditd, journald, and then you're sitting there grepping through thousands of lines trying to find something that looks off. Maybe you've got some one-liners saved, maybe you're running `ausearch` with some flags you half-remember. It works, but it's slow, inconsistent, and easy to miss things.

On the Windows side, the tooling for this is great. Chainsaw by WithSecure lets you point Sigma detection rules at Windows event logs and get back a clean table of hits mapped to MITRE ATT&CK techniques. It's fast, it's reliable, and it's become a staple in most DFIR toolkits.

Linux didn't have that. So I built it.

## What ChopChopGo Does

ChopChopGo applies Sigma detection rules to Linux forensic artifacts and flags matches with timestamps, log messages, and ATT&CK technique tags. It currently supports three log sources:

- **syslog** (`/var/log/messages`, `/var/log/syslog`)
- **auditd** (`/var/log/audit/audit.log`)
- **journald** (via systemd journal)

You point it at a log source, give it a directory of Sigma rules, and it rips through the logs fast. Written in Go, single binary, no dependencies to install on the target or your analysis workstation.

```bash
# Scan syslog with the official Sigma rules
./ChopChopGo -target syslog -rules ./rules/linux/builtin/syslog/

# Scan an auditd log pulled from evidence
./ChopChopGo -target auditd -rules ./rules/linux/auditd/ -file /opt/evidence/auditd.log

# Scan journald
./ChopChopGo -target journald -rules ./rules/linux/builtin/
```

Output looks like this:

```
+-----------------+--------------------------------+-----------------------------------------+
|    TIMESTAMP    |            MESSAGE             |                  TAGS                   |
+-----------------+--------------------------------+-----------------------------------------+
| Mar  2 20:04:38 | fedora systemd[1]:             | attack.defense_evasion-attack.t1562.004 |
|                 | iptables.service: Deactivated  |                                         |
|                 | successfully.                  |                                         |
+-----------------+--------------------------------+-----------------------------------------+
Processed 67504 syslog events
```

Every hit comes back with the raw log message and the MITRE ATT&CK tags from the Sigma rule that matched. In this case, `T1562.004` is "Impair Defenses: Disable or Modify System Firewall." That's your iptables getting turned off.

## Why Sigma Rules

Sigma is an open standard for writing detection rules. The SigmaHQ repo has thousands of community-maintained rules covering everything from persistence mechanisms to lateral movement to defense evasion. The Linux coverage is growing fast.

The advantage of using Sigma over writing custom grep patterns or ad-hoc scripts is consistency and community. When a new technique gets documented, someone usually writes a Sigma rule for it pretty quickly. You pull the latest rules, run ChopChopGo again, and you're catching things you weren't catching last week.

ChopChopGo ships with a script to keep your rules current:

```bash
./update-rules.sh
```

That pulls the latest from the SigmaHQ repo so you're always working with the most recent detection logic.

## Field Mapping

One of the trickier parts of applying Sigma rules to Linux logs is that Sigma field names don't always match what the log source actually calls things. A Sigma rule might reference `CommandLine` but auditd calls that field `exe`. The rule says `ProcessId`, auditd says `pid`.

ChopChopGo handles this with YAML-based field mapping files:

```yaml
source: auditd
fields:
  CommandLine: exe
  Image:       exe
  ProcessId:   pid
  User:        auid
```

These live in the `mappings/` directory and get loaded automatically based on the `-target` flag. If you're dealing with a non-standard log format or want to run rules written for a different schema, you can supply your own:

```bash
./ChopChopGo -target auditd -rules ./rules/ -mapping ./mappings/custom-auditd.yml
```

This means you don't have to fork and modify Sigma rules to make them work with your logs. You just write a mapping file and the translation happens at runtime.

## Auditd Correlation (v1.1.0)

The v1.1.0 release added auditd log correlation, which was a big one. Auditd events that belong to the same syscall share an event ID, but they're spread across multiple log lines. A single `execve` call might generate 5+ lines covering the syscall, the executable path, the arguments, the working directory, and the user context.

Previous versions treated each line independently. Now ChopChopGo correlates related auditd events by their event ID before applying detection rules. This means rules that need to evaluate multiple fields from the same syscall actually work correctly.

## Pipeline Integration

For automated workflows, ChopChopGo supports CSV and JSON output:

```bash
# CSV output piped to a file
./ChopChopGo -target syslog -rules ./rules/linux/builtin/syslog/ -out csv > results.csv

# JSON output for ingestion into Elasticsearch, Splunk, etc.
./ChopChopGo -target auditd -rules ./rules/linux/auditd/ -out json > results.json
```

When you use CSV or JSON mode, the banner and progress bar get suppressed so you get clean machine-readable output on stdout. Useful if you're running ChopChopGo as part of a larger triage script or feeding results into a SIEM.

## Real World Usage

Where I've found this most useful so far:

**Initial triage of a compromised host.** You collect the logs (or mount the disk image), run ChopChopGo against all three log sources, and within seconds you have a prioritized list of suspicious events. Beats grepping for an hour.

**Hunting across a fleet.** If you have centralized logging, you can point ChopChopGo at exported logs from multiple hosts and quickly identify which machines have indicators of compromise.

**Validating detection coverage.** Run ChopChopGo against logs from a red team exercise and see which techniques got flagged. The gaps tell you where your Sigma rule coverage needs work.

## Getting Started

Grab the latest release from GitHub. The release zip includes the binary and the Sigma rules:

https://github.com/M00NLIG7/ChopChopGo/releases

Or build from source:

```bash
git clone https://github.com/M00NLIG7/ChopChopGo.git
cd ChopChopGo
go build
```

You might need the systemd development headers (`apt-get install libsystemd-dev`) for journald support.

## What's Next

The main areas I'm focused on:
- Expanding log source support beyond syslog, auditd, and journald
- Improving parsing performance for very large log files
- Better integration with existing DFIR workflows and toolchains

If you do Linux IR and want to try it out or contribute, the repo is at https://github.com/M00NLIG7/ChopChopGo. Issues and PRs are welcome.
