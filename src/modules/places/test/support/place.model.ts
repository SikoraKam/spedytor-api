import { MockModel } from '../../../../database/support/mock.model';
import { placeStub } from '../placeStub';
import { Place } from '../../places.schema';

export class PlaceModel extends MockModel<Place> {
  protected entityStub = placeStub();
}
