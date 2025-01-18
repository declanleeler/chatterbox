export interface Conversation {
  userId: string;
  name: string;
  createdOn: EpochTimeStamp;
  status?: string;
  updatedOn?: EpochTimeStamp;
}
