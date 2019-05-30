import { City } from 'src/models/map/city';
import { User } from './user';

export class DeliveryAddress {
  city: City;
  user: User;
  address: string;
  comment: string;
  isFavorite: boolean;
}
