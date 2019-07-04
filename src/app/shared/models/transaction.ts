import {User} from './user';
import {Business} from './business';

export interface Transaction {
  id: number;
  user: User;
  business: Business;
  amount: number;
}
