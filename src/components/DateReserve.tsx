"use client"

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
    <div className="bg-slate-100 rounded-lg w-fit px-10 py-5 flex flex-row justify-center gap-5">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker className="bg-white" value={value} onChange={onChange} />
      </LocalizationProvider>
    </div>
  ); 
}