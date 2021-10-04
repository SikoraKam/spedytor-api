import { Prop, Schema } from "@nestjs/mongoose";

export type ForwarderDocument = Forwarder & Document;

@Schema()
export class Forwarder {

  @Prop()
  name: string,

  @Prop()
  lastName: string
}
