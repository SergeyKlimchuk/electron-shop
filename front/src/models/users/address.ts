import { City } from 'src/models/map/city';
import { User } from './user';
import { Auditable } from '../core/auditable';

export class DeliveryAddress implements Auditable {
  id: number;
  city: City;
  user: User;
  address: string;
  comment: string;
  favorite: boolean;
  createdDate: Date;
}
