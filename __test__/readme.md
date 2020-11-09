# TDD Rules
### Development process
Successful implementation of TDD depends on the development processes described below.
#### 1- Write the test before writing the implementation code.
This approach enables developers to focus on the requirements and helps to ensure that tests work as quality assurance, not quality checking.

#### 2- Write new code only when the test is failing.
If tests don’t show the need to modify the implementation code it means either that the test is faulty or that the feature is already implemented. If there are no new features introduced then tests are always passed and therefore useless.

#### 3- Rerun all tests every time the implementation code changes.
The way developers can ensure code modifications do not lead to unintended results. Tests should be run each time the implementation code is changed.  After the code is submitted to version control, developers should perform all tests again to guarantee that no problem will arise due to code changes. This is particularly important when there is more than one developer involved in the project.
#### 4- Pass all tests before writing a new one.
Sometimes developers ignore the problems revealed by existing tests and move towards new functionality. You may want to write several tests before the implementation actually takes place but it is better to resist the temptation. In most cases, this will lead to more problems.

#### 5- Refactor only after passing the tests. If the possibly affected implementation code passes all tests it can be refactored.
In most cases, it doesn’t require new testing. Small changes to existing tests should be enough. The expected outcome of refactoring is to have all tests passed before and after the code has been changed.

### Anatomy
Sigue las siguientes recomendaciones para que tus tests sean mas legibles y sigan el correcto estandar del proyecto.
#### 1- Incluye 3 partes al nombrar cada test
1. **What is being tested?** For example, the ProductsService.addNewProduct method
2. **Under what circumstances and scenario?** For example, no price is passed to the method
3. **What is the expected result?** For example, the new product is not approved
```sh
describe('Products Service', function() {
#1. unit under test
  describe('Add new product', function() {
    #2. scenario and               # 3. expectation
    it('When no price is specified, then the product status is pending approval', ()=> {
      const newProduct = new ProductService().add(...);
      expect(newProduct.status).to.equal('pendingApproval');
    });
  });
});
```
#### 2- Estructura tus tests siguiendo el patron AAA
1. A - **Arrange**: All the setup code to bring the system to the scenario the test aims to simulate. This might include instantiating the unit under test constructor, adding DB records, mocking/stubbing on objects and any other preparation code
2. A - **Act**: Execute the unit under test. Usually 1 line of code
3. A - **Assert**: Ensure that the received value satisfies the expectation. Usually 1 line of code
```sh
describe("Customer classifier", () => {
  test("When customer spent more than 500$, should be classified as premium", () => {
    #Arrange
    const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
    const DBStub = sinon.stub(dataAccess, "getCustomer").reply({ id: 1, classification: "regular" });
    #Act
    const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);
    #Assert
    expect(receivedClassification).toMatch("premium");
  });
});
```

#### 3- Categorizar los tests en al menos 2 niveles.
Aplicando esta estructura los tests quedan agrupados de una forma mucho mas ordenada, lo que nos permite saber de forma clara el modulo que se esta probando y cual es el escenario o la accion que queremos comprobar. 
Un método común para esto es colocar al menos 2 bloques 'describir' encima de sus pruebas: 
1. **nombre de la unidad bajo prueba**
2. nivel adicional de categorización como el **escenario o categorías personalizadas**
```sh
# Unity/Service under test
describe("Shop service", () => {
  # Scenario
  describe("When product is out of stock", () => {
    # Expectation
    test("Then the response status is 404", () => {});
    # Expectation
    test("Then not send it in response", () => {});
  });
});
```