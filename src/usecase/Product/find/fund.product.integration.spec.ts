import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../domain/product/entity/product"
import ProductFactory from "../../../domain/product/factory/product.factory"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import FindProductUseCase from "./find.product.usecase"


const input: InputFindProductDto ={
  id: "1",
}

describe("Integration test find product use case", () => {
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
  
  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Celular", 568.99)
    productRepository.create(product);

    const useCase = new FindProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: "1",
      name: "Celular",
      price: 568.99,
    })
  })
})