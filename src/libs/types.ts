export interface Campground {
  _id: string;
  name: string;
  imageUrl: string;
  address: string;
  telephone: string;
}

export interface CampgroundsResponse {
  count: number;
  data: Campground[];
}

export interface Booking {
  _id: string;
  campground: Campground;
  bookingDate: string;
}