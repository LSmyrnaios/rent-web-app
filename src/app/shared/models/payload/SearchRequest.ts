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
  // tslint:disable-next-line:variable-name
  sort_field: string;
  order: string;
  constructor(lat: number, lng: number, startDate: string, endDate: string, visitors: number, wifi: boolean,
              swimmingPool: boolean, gym: boolean, spa: boolean, bar: boolean, restaurant: boolean,
              petsAllowed: boolean, parking: boolean, roomService: boolean, minPrice: number,
              // tslint:disable-next-line:variable-name
              maxPrice: number, sort_field: string, order: string) {
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
    this.sort_field = sort_field;
    this.order = order;
  }
}
