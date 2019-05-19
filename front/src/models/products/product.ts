import { ProductType } from './product-type';
import { ProductInfoValue } from './product-info-text';
import { Action } from '../actions/actions';

export class Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  actions: Action[];
  count: number;
  imageUrl: string;
  description: string;
  productType: ProductType;
  values: ProductInfoValue[];
}
