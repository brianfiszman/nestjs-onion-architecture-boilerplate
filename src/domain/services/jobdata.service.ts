import { Injectable } from '@nestjs/common';
import { JobdataStatus } from '../enums';
import {
  createErrorsObject,
  createJobdataObject,
  createProcessBatchObject,
  createUpdateStatusObject,
} from '../helpers';
import { errorsData, Jobdata, processBatchData, updateStatusData } from '../interfaces';

@Injectable()
export class JobdataService {
  private jobdata: Jobdata;
  private process: processBatchData;
  private status: updateStatusData;
  private errors: errorsData;

  initJobdata(RUN_DATE: Date): void {
    if (!this.jobdata) {
      this.jobdata = createJobdataObject(RUN_DATE);
    }
  }

  setProcessData(data: Partial<processBatchData>): void {
    if (this.process) {
      this.process = { ...this.process, ...data };
    } else {
      this.process = {
        ...createProcessBatchObject(),
        ...data,
      };
    }
  }

  setStatusData(status: Partial<updateStatusData>): void {
    if (this.status) {
      this.status = { ...this.status, ...status };
    } else {
      this.status = {
        ...createUpdateStatusObject(),
        ...status,
      };
    }
  }

  setErrorsData(errors: Partial<errorsData>): void {
    if (this.errors) {
      this.errors = { ...this.errors, ...errors };
    } else {
      this.errors = {
        ...createErrorsObject(),
        ...errors,
      };
    }
  }

  endJobdata(date: Date): void {
    this.jobdata.end = date;
    this.jobdata.status = JobdataStatus.FINISHED;
  }

  getJobdata(): Jobdata {
    return {
      ...this.jobdata,
      result: {
        products: {
          ...this.process,
          ...this.status,
        },
        errors: this.errors,
      },
    };
  }
}
