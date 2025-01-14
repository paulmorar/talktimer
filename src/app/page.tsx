"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const getBackgroundColor = ({
  initialMinutes,
  minutes,
  seconds,
}: {
  initialMinutes: number;
  minutes: number;
  seconds: number;
}) => {
  const totalSeconds = initialMinutes * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const percentage = remainingSeconds / totalSeconds;
  if (percentage <= 0.15) {
    const adjustedPercentage = percentage / 0.15;
    const red = Math.min(100, Math.floor((1 - adjustedPercentage) * 100));
    return `rgb(${red}, 0, 0)`;
  }

  return `rgb(0, 0, 0)`;
};

export default function Home() {
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [displayClear, setDisplayClear] = useState(false);
  const [bgColor, setBgColor] = useState("rgb(0, 0, 0)");

  useEffect(() => {
    let timer: any;
    if (isTimerRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
        setBgColor(getBackgroundColor({ initialMinutes, minutes, seconds }));
      }, 1000);
    } else if (isTimerRunning && minutes === 0 && seconds === 0) {
      setDisplayClear(true);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, minutes, seconds]);

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) {
      setIsTimerRunning(true);
      setDisplayClear(false);
    }
  };

  const handleClearTImer = () => {
    setIsTimerRunning(false);
    setBgColor("rgb(0, 0, 0)");
  };

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{ backgroundColor: bgColor }}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {isTimerRunning ? (
          <div className="flex flex-col gap-8 justify-center items-center">
            <div className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[20rem] font-bold mt-8">
              {`${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`}
            </div>
            {displayClear && (
              <Button type="button" onClick={handleClearTImer}>
                Clear timer
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-8 justify-center items-center">
              <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-9xl">
                talkTimer
              </h1>
              <p className="text-base text-muted-foreground md:text-xl">
                A simple timer to help you track your talk duration and stay on
                time.
              </p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-24">
              <Input
                type="number"
                placeholder="Minutes"
                value={minutes === 0 ? "" : minutes}
                onChange={(e) => {
                  setInitialMinutes(parseInt(e.target.value));
                  setMinutes(parseInt(e.target.value));
                }}
              />
              <Button type="button" onClick={handleStart}>
                Start timer
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
