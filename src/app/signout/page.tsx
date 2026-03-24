"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Stack,
  Typography,
} from "@mui/material";

export default function SignOutConfirmPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        <Card>
          <CardHeader title="Sign Out" subheader="Ready to leave?" />
          <CardContent>
            <Typography color="text.secondary">
              Are you sure you want to sign out? You will need to log in again to manage bookings or create new ones.
            </Typography>
          </CardContent>
          <CardActions>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirm}
                disabled={loading}
                fullWidth
              >
                {loading ? "Signing out..." : "Yes, sign me out"}
              </Button>
              <Button variant="outlined" onClick={handleCancel} fullWidth disabled={loading}>
                Stay logged in
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}
