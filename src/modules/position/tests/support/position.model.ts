import { MockModel } from '../../../../database/support/mock.model';
import { positionStub } from '../positionStub';
import { Position } from '../../position.schema';
import { NotFoundException } from '@nestjs/common';

export class PositionModel extends MockModel<Position> {
  protected entityStub = positionStub();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  findOne(): { populate: () => Position } {
    return {
      populate: (): Position => this.entityStub,
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  find(): { populate: () => Position[] } {
    return {
      populate: (): Position[] => [this.entityStub],
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  findOneAndUpdate(): { populate: () => Position } {
    return {
      populate: (): Position => this.entityStub,
    };
  }

  findOneAndDelete(filterQuery): boolean {
    if (!filterQuery) {
      // throw new NotFoundException();
      return false;
    }
    return true;
  }
}
