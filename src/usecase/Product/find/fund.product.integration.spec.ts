import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../domain/product/entity/product"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import FindProductUseCase from "./find.product.usecase"


const input: InputFindProductDto ={
  id: "123",
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
    const product = new Product("123", "Celular", 568)
    productRepository.create(product);

    const useCase = new FindProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: "123",
      name: "Celular",
      price: 568,
    })
  })
})