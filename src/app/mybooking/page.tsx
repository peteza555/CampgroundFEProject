"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getBookings, deleteBooking } from "@/libs/api";
import getUserProfile from "@/libs/getUserProfile";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function MyBookingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  const isAdmin = session?.user?.role === "admin";

  const fetchBookings = async () => {
    if (!session?.user.token) return;
    try {
      const res = await getBookings(session.user.token);
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") router.push("/api/auth/signin");
    if (status === "authenticated") {
      fetchBookings();
      const fetchProfile = async () => {
        if (!session?.user.token) return;
        try {
          const res = await getUserProfile(session.user.token);
          setProfile(res.data || res);
        } catch (err) {
          setProfileError("Failed to load profile");
        } finally {
          setProfileLoading(false);
        }
      };
      fetchProfile();
    }
  }, [status, session, router]);

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(bookingId, session!.user.token);
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      alert("Failed to delete booking");
    }
  };

  const handleEdit = (bookingId: string) => {
    router.push(`/booking/edit/${bookingId}`);
  };

  if (status === "loading" || loading || profileLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardHeader title="User Profile" subheader="Signed-in details" />
        <Divider />
        <CardContent>
          {profileError && <Alert severity="error" sx={{ mb: 2 }}>{profileError}</Alert>}
          {profile ? (
            <Stack spacing={0.5}>
              <Typography variant="h6">{profile.name}</Typography>
              <Typography color="text.secondary">Email: {profile.email}</Typography>
              {profile.telephone && (
                <Typography color="text.secondary">Tel: {profile.telephone}</Typography>
              )}
            </Stack>
          ) : (
            <Typography color="text.secondary">Profile information unavailable.</Typography>
          )}
        </CardContent>
      </Card>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          {isAdmin ? "All Bookings" : "My Bookings"}
        </Typography>
        {bookings.length > 0 && (
          <Typography color="text.secondary">{bookings.length} total</Typography>
        )}
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {bookings.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary">No bookings found.</Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {bookings.map((booking) => (
            <Card key={booking._id}>
              <CardContent>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}>
                  <Box>
                    <Typography variant="h6">{booking.campground.name}</Typography>
                    <Typography>Date: {new Date(booking.bookingDate).toLocaleDateString()}</Typography>
                    <Typography color="text.secondary">Address: {booking.campground.address}</Typography>
                    <Typography color="text.secondary">Tel: {booking.campground.telephone}</Typography>
                    {isAdmin && booking.user && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        User: {booking.user}
                      </Typography>
                    )}
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" color="primary" onClick={() => handleEdit(booking._id)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(booking._id)}>
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}