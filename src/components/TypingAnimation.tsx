"use client";

import { useState, useEffect, useRef } from "react";

import React from "react";

interface TypingAnimationProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
}

export default function TypingAnimation({
  texts,
  speed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  className = "",
  style,
  loop = true,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentText = texts[currentIndex];

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        if (loop || currentIndex < texts.length - 1) {
          setIsDeleting(true);
        }
      }, pauseDuration);
      return;
    }

    if (isDeleting) {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (displayText.length < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, speed);
      } else {
        setIsPaused(true);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    displayText,
    currentIndex,
    isDeleting,
    isPaused,
    texts,
    speed,
    deleteSpeed,
    pauseDuration,
    loop,
  ]);

  return (
    <span className={className} style={style}>
      {displayText}
      <span
        className="inline-block ml-0.5"
        style={{
          color: "#00ff41",
          animation: "blink-cursor 1s infinite",
          fontWeight: "bold",
        }}
      >
        _
      </span>
    </span>
  );
}
