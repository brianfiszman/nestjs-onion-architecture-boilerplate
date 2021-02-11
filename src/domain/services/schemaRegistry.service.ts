import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { getSchemaRegistryOptions, EnvObjects, SchemaRegistryIds } from '../../infrastructure/config';
import { SchemaRegistryModel } from '../interfaces';
import { KafkaTopics } from '../enums';

@Injectable()
export class SchemaRegistryService {
  private schemaClient: SchemaRegistry | null;

  constructor(private readonly configService: ConfigService) {}

  initSchemaRegisterClient(): void {
    this.schemaClient = new SchemaRegistry(getSchemaRegistryOptions());
  }

  async encodePayload(schemaId: number, payload: any): Promise<Buffer | undefined> {
    return await this.schemaClient?.encode(schemaId, payload);
  }

  async decodePayload(buffer: Buffer): Promise<any> {
    return await this.schemaClient?.decode(buffer);
  }

  async getIdFromSchema(schema: SchemaRegistryModel, subject: string): Promise<number | undefined> {
    return await this.schemaClient?.getRegistryIdBySchema(subject, schema as any);
  }

  async getSchemaById(id: number): Promise<any> {
    return await this.schemaClient?.getSchema(id);
  }

  getSchemaIdByTopic(topic: KafkaTopics): number {
    const schemas = this.configService.get<SchemaRegistryIds>(EnvObjects.SCHEMAS_ID);
    return (schemas as SchemaRegistryIds)[topic];
  }
}
