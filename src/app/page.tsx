import Banner from "@/components/Banner";
import Link from "next/link";
import { Box, Button, Container, Stack, Typography, Card, CardContent } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#f5f7fb" }}>
      <Banner />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={3} alignItems="center" textAlign="center">
              <Typography variant="h4" fontWeight={600}>
                Discover Your Next Escape
              </Typography>
              <Typography color="text.secondary">
                Browse our curated list of campgrounds, filter by your preferences, and book a stay in minutes.
              </Typography>
              <Button
                component={Link}
                href="/campgrounds"
                variant="contained"
                size="large"
                sx={{ px: 4 }}
              >
                Browse Campgrounds
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}