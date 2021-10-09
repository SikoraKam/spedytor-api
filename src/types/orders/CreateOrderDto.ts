export class CreateOrderDto {
  dateStart: Date;
  dateEnd: Date;
  forwarderId: string;
  providerId: string;
  placeStart: string;
  destinations: string[];
}
