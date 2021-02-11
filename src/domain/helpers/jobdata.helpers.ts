import { KafkaProducers } from '../enums';
import { JobdataStatus } from '../enums/jobdata.enums';
import { Jobdata, processData, updateStatusData, processBatchData, errorsData } from '../interfaces';

export const createJobdataObject = (date: Date): Jobdata => ({
  status: JobdataStatus.ACTIVE,
  start: date,
  end: null,
  producer: KafkaProducers.ALKEMICS,
});

export const createUpdateStatusObject = (): updateStatusData => ({
  notUpdated: 0,
  newCancelled: 0,
});

export const createProcessBatchObject = (): processBatchData => ({
  received: 0,
  new: 0,
  merged: 0,
  total: 0,
});

export const createErrorsObject = (): errorsData => ({
  noName: 0,
  noEan: 0,
});

export const createProcessDataObject = (): processData => ({
  products: {
    ...createProcessBatchObject(),
    ...createUpdateStatusObject(),
  },
  errors: {
    ...createErrorsObject(),
  },
});
