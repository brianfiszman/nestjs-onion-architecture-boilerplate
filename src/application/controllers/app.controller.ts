/* eslint-disable max-len */
import { Controller, UseInterceptors, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaSignals, KafkaTopics } from '../../domain/enums';
import { ProductsService, KafkaService, FactoryService } from '../../domain/services';
import { JobdataService } from '../../domain/services';
import { ProductMessageSendDto, ActionMessageGetDto, ErrorMessageSendDto } from '../dtos';
import { JobdataMessageSendDto } from '../dtos/messages/message-jobdata.dto';
import { SerializerInterceptor } from '../interceptors/serializer.interceptor';
import { ConvertToDtoPipe } from '../pipes';

@Controller()
export class AppController {
  constructor(
    private productsService: ProductsService,
    private kafkaService: KafkaService,
    private factoryService: FactoryService,
    private jobdataService: JobdataService
  ) {}

  async onModuleInit(): Promise<void> {
    await this.kafkaService.connectProducer([KafkaTopics.PRODUCTS, KafkaTopics.JOBDATA, KafkaTopics.ERRORS]);
  }

  @UseInterceptors(SerializerInterceptor) // Decode AVRO messages using schema registry
  @UsePipes(ConvertToDtoPipe) // Convert decode message in a valid DTO
  @MessagePattern(KafkaTopics.ACTIONS) // Receive messages from topic ACTIONS
  async processBatch(@Payload() message: ActionMessageGetDto): Promise<any> {
    if (message.data === KafkaSignals.START) {
      // Init Jobdata...
      const RUN_DATE = new Date();
      this.jobdataService.initJobdata(RUN_DATE);

      try {
        // ----- Start import -----
        // Send product...
        //this.kafkaService.sendMessage(KafkaTopics.PRODUCTS, new ProductMessageSendDto('product'));
        // ----- End import -----
      } catch (error) {
        // Send errors using kafka...
        this.kafkaService.sendMessage(KafkaTopics.ERRORS, new ErrorMessageSendDto(error, AppController.name));
      }

      // End Jobdata...
      this.jobdataService.endJobdata(new Date());
      const jobdata = this.jobdataService.getJobdata();
      // Send Jobdata...
      this.kafkaService.sendMessage(KafkaTopics.JOBDATA, new JobdataMessageSendDto(jobdata));
      return;
    }
  }
}
