interface SchemaFields {
  name: string;
  type: string;
  doc?: string;
}

export interface SchemaRegistryModel {
  type: string;
  name: string;
  namespace: string;
  fields: SchemaFields[];
  doc?: string;
}
