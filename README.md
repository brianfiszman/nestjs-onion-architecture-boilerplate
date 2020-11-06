# Express + MongoDB + TypeScript example integration

1. Install dependencies via `yarn` or `npm install`
2. Run `docker-compose up -d` to start mongodb
3. Run via `yarn start` or `yarn start:dev` (watch mode)
4. Example API is running on localhost:3000

# Available routes:

|method|endpoint|description|params|
|:-----|:-----|:-----|:-----|
|GET|/author|finds all authors| |
|GET|/author/:id|finds author by id| |
|POST|/author|creates new author| |
|PUT|/author/:id|updates author by id| |

|method|endpoint|description|params|
|:-----|:-----|:-----|:-----|
|GET|/book|finds all books| |
|GET|/book/:id|finds book by id| |
|POST|/book|creates new book| |
|PUT|/book/:id|updates book by id |

# Project Structure
```sh
    src
    |_ application
        |_ controllers
        |_ dtos
    |_ domain
        |_ entities
        |_ services
    |_ infrastructure
        |_ repositories
        
```
### - Application

This layer should limit your responsibilities to the following tasks
1. Execute access control policies (authentication, authorization, etc.)
2. validating user input
3. send calls or commands to the appropriate service method
4. transform entities returned by the service into data transfer objects (DTO) for output / serialization

###### Controllers
It receives the requests made to the server and uses the ***services*** to send responses to the client.


###### DTOs
As its name indicates, it is an object that will be used to ***transfer information*** and represents the object that will be sent to the client, this is the object that our API will return to the rest of the services, either For internal use or for third parties, so we can have multiple DTOs for each entity according to the use we need.
It is also used to define the type of objects to be received by the controllers
- The DTO should have only data, ***should not to have any type of business logic***.
- May have references to other DTOs

### - Domain
Contains all domain level concerns, this includes ***business logic***, and domain objects (Entities)
>Transformation to DTOs should be done exclusively at the edge (our controllers), because that is where serialization happens and also because, depending on our project requirements, several controllers or services can call these methods and they will want to deal with the purest form of the data.

###### Entities
Represents an object in the database and encapsulates key rules related to that object, so it can contain some logic to ***validate its properties*** but ***not*** complex business logic.
- An entity must always represent the ***object in the database***, so it must not have more or less properties than the object it represents.
###### Services
It contains the business logic which provides controllers (or other services) to be used.
- Your methods can receive both ***Entities*** and ***Data***
- They should always return ***entities*** that will be converted into ***DTOs*** by the controller

### - Infraestructure
###### Repositories

>According to Martin Fowler, the Repository Pattern can be described as:
Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.
So a repository will generally have methods such as findOne, findAll, remove, and such. Your service layer will manipulate the collection through these repository methods. Their implementation is not a concern to our business logic.

The repository is an intermediary between the domain and the data source and ***provides the services with the basic extraction operations (CRUD)*** (findOne, findAll, updateOne, remove).

When using TypeOrm, the CRUD methods are injected by the ORM to our repository, being able to define more specific methods (that do not imply business logic) in the repository file.