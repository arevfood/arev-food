export type GeneralKeyValue<T> = {
  [key: string]: T | GeneralKeyValue<T>;
};
