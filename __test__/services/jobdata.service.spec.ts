import { Test, TestingModule } from '@nestjs/testing';
import { JobdataService } from '../../src/domain/services';
import {
  createErrorsObject,
  createJobdataObject,
  createProcessBatchObject,
  createUpdateStatusObject,
} from '../../src/domain/helpers';

describe('Jobdata Service', () => {
  let service: JobdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobdataService],
    }).compile();

    service = module.get<JobdataService>(JobdataService);
    service.initJobdata(new Date());
  });

  describe('Test initial jobdata method', () => {
    it('Should set a valid jobdata object inside the service', () => {
      const jobdata = service.getJobdata();
      const properties = Object.keys(createJobdataObject(new Date()));

      properties.map(key => expect(jobdata).toHaveProperty(key));
    });

    it('Should create an only jobdata object in any instance (singleton)', () => {
      const initialJobdata = service.getJobdata();

      service.initJobdata(new Date());
      const secondJobdata = service.getJobdata();

      expect(initialJobdata).toStrictEqual(secondJobdata);
    });
  });

  describe('Test processData setter method', () => {
    it('Should set a valid process object inside the service', () => {
      service.setProcessData({});

      const jobdata = service.getJobdata();
      const result = jobdata.result?.products;
      const properties = Object.keys(createProcessBatchObject());

      properties.map(key => expect(result).toHaveProperty(key));
    });

    it('Should replace init object with new properties', () => {
      const expectedResult = createProcessBatchObject();

      service.setProcessData({});
      service.setProcessData(expectedResult);

      const jobdata = service.getJobdata();
      const { result } = jobdata || {};

      expect(result?.products).toStrictEqual(expectedResult);
    });
  });

  describe('Test status setter method', () => {
    it('Should set a valid status object inside the service', () => {
      service.setStatusData({});

      const jobdata = service.getJobdata();
      const result = jobdata.result?.products || {};
      const properties = Object.keys(createUpdateStatusObject());

      properties.map(key => expect(result).toHaveProperty(key));
    });

    it('Should replace init object with new properties', () => {
      const expectedResult = createUpdateStatusObject();

      service.setStatusData({});
      service.setStatusData(expectedResult);

      const jobdata = service.getJobdata();
      const result = jobdata.result?.products || {};

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('Test errors setter method', () => {
    it('Should set a valid errors object inside the service', () => {
      service.setErrorsData({});

      const jobdata = service.getJobdata();
      const result = jobdata.result?.errors || {};
      const properties = Object.keys(createErrorsObject());

      properties.map(key => expect(result).toHaveProperty(key));
    });

    it('Should replace init object with new properties', () => {
      const expectedResult = createErrorsObject();

      service.setErrorsData({});
      service.setErrorsData(expectedResult);

      const jobdata = service.getJobdata();
      const result = jobdata.result?.errors || {};

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
