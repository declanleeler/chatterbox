export interface NewChat {
  userId: number;
  name: string;
  createdOn: EpochTimeStamp;
}

export interface Chat extends NewChat {
  _id: string;
}
