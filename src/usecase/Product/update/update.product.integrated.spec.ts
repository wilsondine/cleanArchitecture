import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputUpdateProductDto } from "./update.product.dto"
import { UpdateProductUseCase } from "./update.product.usecase"


const input: InputUpdateProductDto ={
  name: "Celular updated",
  id: "1",
  price: 568.99,
}

describe("Integrated test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true}
    })
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async() => {
    await sequelize.close()
  })

  it("should update a product", async () => {
    const product = new Product("1", "Celular 1", 985.66)
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const useCase = new UpdateProductUseCase(productRepository);


    const output = await useCase.execute(input);
    
    expect(output).toEqual(input)
  })
})