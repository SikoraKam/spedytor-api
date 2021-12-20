import { MockModel } from '../../../../database/support/mock.model';
import { Order } from '../../orders.schema';
import { orderStub } from '../order.stub';

export class OrderModel extends MockModel<Order> {
  protected entityStub = orderStub();
}
