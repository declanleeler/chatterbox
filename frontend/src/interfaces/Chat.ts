export interface Chat {
  userId: number;
  name: string;
  createdOn: EpochTimeStamp;
  updatedOn?: EpochTimeStamp;
}
