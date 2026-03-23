"use client";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

type DateReserveProps = {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
};

export default function DateReserve({ value, onChange }: DateReserveProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="w-full"
          value={value}
          onChange={onChange}
          slotProps={{ textField: { fullWidth: true, variant: "outlined", size: "small" } }}
        />
      </LocalizationProvider>
    </div>
  );
}