export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructorSpy(_createEntityData: T): void {}

  async findOne(): Promise<T> {
    return this.entityStub;
  }

  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }
}
