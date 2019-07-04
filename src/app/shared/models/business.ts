import {User} from './user';
import {Hotel} from './hotel';
import {Wallet} from './wallet';
import {Transaction} from './transaction';

export interface Business {
  id: number;
  business_name: string;
  email: string;
  address: string;
  tax_number: string;
  tax_office: string;
  owner_name: string;
  owner_surname: string;
  owner_patronym: string;
  id_card_number: string;
  id_card_date_of_issue: Date;
  residence_address: string;
  provider: User;
  wallet: Wallet;
  hotels: Hotel[];
  transactions: Transaction[];
}
