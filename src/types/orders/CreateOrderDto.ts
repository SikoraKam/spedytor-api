export class CreateOrderDto {
  dateStart: Date;
  dateEnd: Date;
  forwarder: string;
  provider: string;
  placeStart: string;
  destinations: string[];
}
