import { JobdataStatus } from '../../enums';

export interface processBatchData {
  received: number;
  new: number;
  merged: number;
  total: number;
}

export interface updateStatusData {
  notUpdated: number;
  newCancelled: number;
}

export interface errorsData {
  noName: number;
  noEan: number;
}

export interface processData {
  products: processBatchData & updateStatusData;
  errors: errorsData;
}
export interface Jobdata {
  status: JobdataStatus;
  start: Date;
  end: Date | null;
  producer: any;
  result?: processData;
}
