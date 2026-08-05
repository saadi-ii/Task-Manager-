"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { FiCalendar } from "react-icons/fi";
import { setTaskDate } from "@/lib/api/task/date";
import { setSubtaskDate } from "@/lib/api/subtask/date";
import { toast } from "sonner";
import { todayYMD } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DueDateProps =
  | { mode: "task"; taskname: string; columnid: string; date?: string }
  | { mode: "subtask"; taskid: string; subtaskname: string; date?: string };

const ymdToDate = (ymd: string): Date | undefined => {
  if (!ymd) return undefined;
  const [year, month, day] = ymd.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const dateToYMD = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const DueDate = (props: DueDateProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(props.date ?? "");

  const handleSelect = async (selected: Date | undefined) => {
    if (!selected) return;
    const newDate = dateToYMD(selected);

    if (newDate < todayYMD()) {
      toast.error("Due date cannot be in the past");
      return;
    }

    const previous = date;
    setDate(newDate);
    setOpen(false);
    try {
      if (props.mode === "task") {
        await setTaskDate({ taskname: props.taskname, columnid: props.columnid, date: newDate });
      } else {
        await setSubtaskDate({ subtaskname: props.subtaskname, taskid: props.taskid, date: newDate });
      }
    } catch {
      setDate(previous);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="h-auto border-border p-0.5 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {date === "" ? (
              <FiCalendar className="text-muted-foreground" />
            ) : (
              <div className="text-xs">{date}</div>
            )}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={ymdToDate(date)}
          onSelect={handleSelect}
          defaultMonth={ymdToDate(date)}
          disabled={{ before: ymdToDate(todayYMD())! }}
        />
      </PopoverContent>
    </Popover>
  );
};
