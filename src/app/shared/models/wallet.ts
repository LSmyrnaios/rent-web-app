import {User} from './user';
import {Business} from './business';

export interface Wallet {
  id: number;
  balance: DoubleRange;
  user_owner: User;
  business_owner: Business;
}
