import { ProductType } from './product-type';
import { ProductInfoValue } from './product-info-text';

export class Product {
  id: number;
  name: string;
  price: number;
  count: number;
  imageUrl: string;
  description: string;
  productType: ProductType;
  values: ProductInfoValue[];
}
