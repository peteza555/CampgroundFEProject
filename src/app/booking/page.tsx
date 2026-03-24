"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DateReserve from "@/components/DateReserve";
import { getCampgrounds, createBooking } from "@/libs/api";
import dayjs, { Dayjs } from "dayjs";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campgroundId = searchParams.get("campgroundId");

  const { data: session, status } = useSession();
  const [campgrounds, setCampgrounds] = useState<any[]>([]);
  const [selectedCampground, setSelectedCampground] = useState(campgroundId || "");
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
  }, [status, router]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const res = await getCampgrounds();
        setCampgrounds(res.data);
        if (!campgroundId && res.data.length > 0) setSelectedCampground(res.data[0]._id);
      } catch (err) {
        setError("Failed to load campgrounds");
      }
    };
    fetchCampgrounds();
  }, [campgroundId]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!selectedCampground || !bookingDate) {
      setError("Please select campground and date");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createBooking(selectedCampground, bookingDate.toISOString(), session!.user.token);
      router.push("/mybooking");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading")
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card>
        <CardHeader title="Create Booking" subheader="Reserve your next stay" />
        <CardContent>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <FormControl fullWidth required>
              <InputLabel id="campground-label">Campground</InputLabel>
              <Select
                labelId="campground-label"
                label="Campground"
                value={selectedCampground}
                onChange={(e) => setSelectedCampground(e.target.value)}
              >
                <MenuItem value="">Select a campground</MenuItem>
                {campgrounds.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Booking Date
              </Typography>
              <DateReserve value={bookingDate} onChange={setBookingDate} />
            </Box>
            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}