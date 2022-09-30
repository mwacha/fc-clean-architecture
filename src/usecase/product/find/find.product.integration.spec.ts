import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"


describe("Unit Test find product use case", () => {
    let sequelize: Sequelize; 
    jest.setTimeout(10_000);
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const product = new Product("123", "Any...", 56);
        const repository = new ProductRepository();

        await repository.create(product);

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

     it("should product not found", async () => {
        const repository = new ProductRepository();
        expect(async () => {
           return await new FindProductUseCase(repository).execute({id: "Id..."});
        }).rejects.toThrow("Product not found")
    });
   
});
