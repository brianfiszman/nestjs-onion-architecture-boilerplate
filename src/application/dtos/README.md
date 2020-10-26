# Data Transfer Objects

> [DTOs](https://en.wikipedia.org/wiki/Data_transfer_object) are essentially domain objects transformed to a shape that is more context aware by being filtered for private/[PII](https://en.wikipedia.org/wiki/Personal_data) data and absent of characteristics that are serialization barriers like circular dependencies. They are optimized for bandwidth usage as well, but more generally, **they include all and only the data the current read or write action requires to function.**

> They are ready for serialization into JSON or whatever transport protocol we choose to use and their primary purpose is to transfer data between two processes or systems according to a predefined spec or schema. We will be placing any DTO used for either input or output at src/application/dtos.
