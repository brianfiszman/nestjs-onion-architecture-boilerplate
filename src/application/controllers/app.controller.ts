import { Controller, Get } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from '@nestjs/microservices';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello, world!';
  }

  // Kafka Producer App ---
  /* @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'BoilerplateProducer',
        brokers: ['kafka:19092'],
      },
      consumer: {
        groupId: 'my-kafka-consumer',
      },
    },
  })
  client: ClientKafka;

  async OnModuleInit() {
    this.client.subscribeToResponseOf('import');
    await this.client.connect();
  }

  @Get('send')
  sendMessage(): string {
    this.client.send('import', 'prueba');
    return 'mensaje enviado!!';
  } */

  // Kafka Consumer App ----

  @MessagePattern('import')
  getKafkaMessage(@Payload() message: any): any {
    console.log('Message from kafka: ' + message.value);
    return 'Mensaje recibido!!';
  }
}
