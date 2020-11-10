# CONTROLLER

> The responsibility of controllers in Nest.js is to receive and handle the incoming HTTP requests from the client side of an application and return the appropriate responses based on the business logic.  
> The routing mechanism, which is controlled by the decorator `@Controller()` attached to the top of each controller, usually determines which controller receives which requests. 

To create a new controller file for our project, run the following command from the terminal:
```console
foo@bar:~$ nest generate controller product
```
You will see the following output.
```
CREATE src/product/product.controller.spec.ts (499 bytes)
CREATE src/product/product.controller.ts (103 bytes)
```
