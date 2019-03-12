import { ProductType } from './product-type';
import { Dictionary } from '../dictionaries/dictionary';
export class ProductInfoTitle {
  id: number;
  productType: ProductType;
  name: string;
  type: string;
  dictionary: Dictionary;
}
