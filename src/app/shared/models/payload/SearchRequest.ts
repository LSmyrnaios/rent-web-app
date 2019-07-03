export class SearchRequest {
  lat: number;
  lng: number;
  startDate?: string;
  endDate?: string;
  visitors?: number;
  wifi?: boolean;
  swimmingPool?: boolean;
  gym?: boolean;
  spa?: boolean;
  bar?: boolean;
  restaurant?: boolean;
  petsAllowed?: boolean;
  parking?: boolean;
  roomService?: boolean;
  minPrice: number;
  maxPrice: number;
  constructor(lat: number, lng: number, startDate: string, endDate: string, visitors: number, wifi: boolean,
              // tslint:disable-next-line:variable-name
              swimmingPool: boolean, gym: boolean, spa: boolean, bar: boolean, restaurant: boolean,
              // tslint:disable-next-line:variable-name
              petsAllowed: boolean, parking: boolean, roomService: boolean, minPrice: number,
              maxPrice: number) {
    this.lat = lat;
    this.lng = lng;
    this.startDate = startDate;
    this.endDate = endDate;
    this.visitors = visitors;
    this.wifi = wifi;
    this.swimmingPool = swimmingPool;
    this.gym = gym;
    this.spa = spa;
    this.bar = bar;
    this.restaurant = restaurant;
    this.petsAllowed = petsAllowed;
    this.parking = parking;
    this.roomService = roomService;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}
