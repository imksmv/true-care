"use client";

import { Label } from "@/components/ui/label";
import { TimePeriod, TimePicker } from "@/components/ui/time-picker";
import { Period } from "@/lib/utils";
import { Clock } from "lucide-react";
import * as React from "react";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export const TimePickerInput = ({ date, setDate }: TimePickerProps) => {
  const [period, setPeriod] = React.useState<Period>("PM");

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="flex h-10 items-center">
        <Clock size={16} />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePicker
          picker="12hours"
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePicker
          picker="minutes"
          id="minutes12"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
      {/* TODO: Fix default values for date and time and PM/AM */}
      <TimePeriod
        period={period}
        setPeriod={setPeriod}
        date={date}
        setDate={setDate}
        ref={periodRef}
      />
    </div>
  );
};

export default TimePickerInput;
