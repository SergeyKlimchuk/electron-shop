import { ProductPropertyTitleType } from 'src/models/products/product-property-title-type';
import { ProductType } from './product-type';
import { Dictionary } from '../dictionaries/dictionary';
export class ProductInfoTitle {
  id: number;
  productType: ProductType;
  name: string;
  type = ProductPropertyTitleType.None;
  dictionary: Dictionary;
}
