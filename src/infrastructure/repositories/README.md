# REPOSITORY PATTERN
> According to Martin Fowler, the Repository Pattern can be described as:

> Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.

> So a repository will generally have methods such as findOne, findAll, remove, and such. Your service layer will manipulate the collection through these repository methods. Their implementation is not a concern to our business logic.

> Using this pattern is what enables us to easily unit-test our business logic by allowing us to mock the repository in an isolated manner. We'll see how that works later on.

> In our case, mikro-orm already provides repositories for our entities so that we don't have to write those basic collection methods ourselves. As you can see, we are creating our own custom repository by extending EntityRepository<Entity> which will allow us to define any needed custom queries. Other than the basic collection methods, any custom query your serivce needs to run against your database should be written as a new method on the repository. For example, there could be a need for a findAllCompletedTodos.

> It would also be possible to write the entire repository from scratch ourselves and still keep the same interface in a situation where we are not interested or are unable to use any ORM. This is why abstractions are so important.
