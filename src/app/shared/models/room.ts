export interface Room {
  image: string;
  id: number;
  capacity: number;
  price: number;
  roomNumber: number;
  hotel: number;
  createdAt?: Date;
  updatedAt?: Date;
  photosUrls: string[];
}
