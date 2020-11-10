# SERVICE
> A service, also known as a provider, is another building block in Nest.js that is categorized under the separation of concerns principle.  
> It is designed to handle and abstract complex business logic away from the controller and return the appropriate responses.  
> All services in Nest.js are decorated with the **@Injectable()** decorator and this makes it easy to inject services into any other file, such as controllers and modules.

Create a service for product using the following command:

```console
foo@bar:~$ nest generate service product
```

After running the command above, you will see the following output on the terminal.

```console
CREATE /src/product/product.service.spec.ts (467 bytes)
CREATE /src/product/product.service.ts (91 bytes)
UPDATE /src/product/product.module.ts (167 bytes)

```
What happened here is that the nest command has created two new files.  
These are:

* `product.service.spec.ts`: This file will be used to write unit tests for the methods that will be created within the product service file.
* `product.service.ts`: This is the product service file that will hold all the business logic for the application.

It has also automatically imported the newly created service and added it to the `product.module.ts` file.
