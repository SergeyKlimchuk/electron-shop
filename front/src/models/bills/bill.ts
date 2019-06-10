import { BillStatus } from './BillStatus';
import { Product } from '../products/product';

export class Bill {
  id: number;
  status: BillStatus;
  products: Product[];
  lastModifiedDate: Date;
  createdDate: Date;
}
