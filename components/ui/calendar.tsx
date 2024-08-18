"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, setMonth, setYear } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hidden",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns: "flex grow gap-2 mr-2",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Dropdown: ({ ...props }) => {
          const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } =
            useDayPicker();
          const { goToMonth, currentMonth } = useNavigation();

          const [selectedMonth, setSelectedMonth] = React.useState(
            currentMonth.getMonth(),
          );
          const [selectedYear, setSelectedYear] = React.useState(
            currentMonth.getFullYear(),
          );

          // Ensure the state updates when currentMonth changes
          React.useEffect(() => {
            setSelectedMonth(currentMonth.getMonth());
            setSelectedYear(currentMonth.getFullYear());
          }, [currentMonth]);

          if (props.name === "months") {
            const selectMonth = Array.from({ length: 12 }, (_, i) => ({
              value: i.toString(),
              label: format(setMonth(new Date(), i), "MMMM"),
            }));

            return (
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => {
                  const newMonth = parseInt(value);
                  setSelectedMonth(newMonth);
                  goToMonth(
                    setMonth(new Date(selectedYear, newMonth), newMonth),
                  );
                }}
              >
                <SelectTrigger>
                  {format(
                    setMonth(
                      new Date(selectedYear, selectedMonth),
                      selectedMonth,
                    ),
                    "MMMM",
                  )}
                </SelectTrigger>
                <SelectContent>
                  {selectMonth.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }

          if (props.name === "years") {
            const earliestYear =
              fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear();
            const latestYear =
              toYear || toMonth?.getFullYear() || toDate?.getFullYear();

            if (earliestYear && latestYear) {
              const selectYears = Array.from(
                { length: latestYear - earliestYear + 1 },
                (_, i) => ({
                  value: (latestYear - i).toString(),
                  label: (latestYear - i).toString(),
                }),
              );

              return (
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => {
                    const newYear = parseInt(value);
                    setSelectedYear(newYear);
                    goToMonth(
                      setYear(new Date(newYear, selectedMonth), newYear),
                    );
                  }}
                >
                  <SelectTrigger>{selectedYear}</SelectTrigger>
                  <SelectContent>
                    {selectYears.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }
          }

          return null;
        },
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
