import Product from "../../../domain/product/entity/product";
import IProductRepository from "../../../domain/product/repository/product-repository.interface";
import FindProductUseCase from "./find.product.usecase";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

const product = new Product("1", "Product 1", 100);

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };



describe("Unit Test find product use case", () => {
    it("should find a product", async () => {
        const product = new Product("123", "Any", 56);
        const repository = MockRepository();
        repository.find = jest.fn().mockReturnValue(Promise.resolve(product))

        const input: InputFindProductDTO = {
            id: product.id
        }

        const output: OutputFindProductDTO = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await new FindProductUseCase(repository).execute(input);
        expect(output).toStrictEqual(result);
    });
    

    it("should not find a product", async () => {
      const customerRepository = MockRepository();
      customerRepository.find.mockImplementation(() => {
        throw new Error("Product not found");
      });
      const usecase = new FindProductUseCase(customerRepository);
  
      const input = {
        id: "123",
      };
  
      expect(() => {
        return usecase.execute(input);
      }).rejects.toThrow("Product not found");
    });
});