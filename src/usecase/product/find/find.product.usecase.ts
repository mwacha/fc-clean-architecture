import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
    InputFindProductDTO,
    OutputFindProductDTO,
  } from "./find.product.dto";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.productRepository = repository;
    }

    async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
        const product = await this.productRepository.find(input.id);
        
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    } 

}