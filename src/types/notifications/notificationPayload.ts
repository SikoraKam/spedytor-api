import { Order } from '../../modules/orders/orders.schema';

export class NotificationPayload {
  title: string;
  announcement: string;
  orderObject: Order;
}
