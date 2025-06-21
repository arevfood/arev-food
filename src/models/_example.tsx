// TODO: Change `Example` to your model name and change `User` with your model Name

import { GeneralOmitModel } from "./general-omit";

export interface ExampleDataModel {}

export interface ExamplePayloadCreateModel {}

export interface ExamplePayloadUpdateModel {}

export interface ExampleFormModel
  extends Omit<ExampleDataModel, GeneralOmitModel> {}
