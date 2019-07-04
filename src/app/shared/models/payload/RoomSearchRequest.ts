export class RoomSearchRequest {
  startDate?: string;
  endDate?: string;
  visitors?: number;
  minPrice: number;
  maxPrice: number;
  constructor(startDate: string, endDate: string, visitors: number, minPrice: number, maxPrice: number) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.visitors = visitors;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}
