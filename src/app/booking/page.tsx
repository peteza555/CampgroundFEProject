"use client"

import DateReserve from "@/components/DateReserve";
import styles from "./page.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import { addBooking } from "@/redux/features/bookSlice";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function Booking() {

  const [ nameLastName, setNameLastName ] = useState<string>(""); 
  const [ tel, setTel ] = useState<string>(""); 
  const [ venue, setVenue ] = useState<string>("Bloom");
  const [ bookDate, setBookDate ] = useState<Dayjs | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameLastName(event.target.value);
  }
  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value);
  }
  const handleVenueChange = (event: SelectChangeEvent<string>) => {
    setVenue(event.target.value);
  }
  const handleBookDateChange = (value: Dayjs | null) => {
    setBookDate(value);
  }

  const dispatch = useDispatch<AppDispatch>();

  const makeBooking = () => {
    const item: BookingItem = {
      nameLastname: nameLastName,
      tel: tel,
      venue: venue,
      bookDate: dayjs(bookDate).format("YYYY/MM/DD")
    }
    dispatch(addBooking(item));
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Booking Details</h2>
            <p className={styles.formText}>
              Fill out the details below to reserve a venue for your next event.
            </p>
          </div>

          <form className={styles.form}>
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Booker Name</label>
                <TextField
                  fullWidth
                  variant="standard"
                  name="Name-Lastname"
                  label="Name-Lastname"
                  value={nameLastName}
                  onChange={handleNameChange}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Booker Contact Number</label>
                <TextField
                  fullWidth
                  variant="standard"
                  name="Contact-Number"
                  label="Contact-Number"
                  value={tel}
                  onChange={handleTelChange}
                />
              </div>

              <div className={styles.fieldWide}>
                <label className={styles.fieldLabel}>Booking Venue</label>
                <Select
                  fullWidth
                  variant="standard"
                  id="venue"
                  value={venue}
                  onChange={handleVenueChange}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                  <MenuItem value="Spark">Spark Space</MenuItem>
                  <MenuItem value="GrandTable">The Grand Table</MenuItem>
                </Select>
              </div>

              <div className={styles.fieldWide}>
                <label className={styles.fieldLabel}>Booking Date</label>
                <DateReserve value={bookDate} onChange={handleBookDateChange} />
              </div>
            </div>

            <button className={styles.submitButton} name="Book Venue" type="submit" onClick={makeBooking}>
              Book Venue
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}