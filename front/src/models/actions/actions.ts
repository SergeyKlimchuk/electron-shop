import { Product } from '../products/product';

export class Action {
  id: number;
  name: string;
  dateStart: string;
  dateFinish: string;
  info: string;
  imageUrl: string;
  discountInPercent: boolean;
  discountValue: number;
  hasDiscount: boolean;
  products: Product[] = [];
}
