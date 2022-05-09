import { EntityRepository, Repository } from 'typeorm';
import { Option } from './option.entity';
import { Product } from '../product/product.entity';
import { CreateProductDto } from '../product/dto/save-product.dto';

@EntityRepository(Option)
export class OptionRepository extends Repository<Option> {
  async getOptions(): Promise<Option[]> {
    const query = this.createQueryBuilder('Product');

    const products = await query.getMany();
    return products;
  }

  async createOption(createProductDto: CreateProductDto): Promise<Product> {
    const { title, description, price, image } = createProductDto;

    const product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
    if (image) product.image = image;

    await product.save();

    return product;
  }
}
