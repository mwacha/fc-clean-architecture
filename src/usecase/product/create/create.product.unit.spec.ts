import IProductRepository from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";
import CreateProductUseCase from "./create.product";

const Repository = (): IProductRepository => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test create product use case", () => {
    it("should create a new product", async () => {
        const repository = Repository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProductDTO = {
            name: "Some...",
            price: 150
        }

        const output: OutputCreateProductDTO = await usecase.execute(input)                                                                                                                                                                                                           
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {
        const repository = Repository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProductDTO = {
            name: "",
            price: 158
        }

        expect(async () => await usecase.execute(input)).rejects.toThrow("Name is required");                                                                                                                                                                                                          
    })

    it("should throw an error when price is invalid", async () => {
        const repository = Repository();
        const usecase = new CreateProductUseCase(repository)
        const input: InputCreateProductDTO = {
            name: "Some...",
            price: -150
        }

        expect(async () => await usecase.execute(input)).rejects.toThrow("Price must be greater than zero");                                                                                                                                                                                                          
    })
});