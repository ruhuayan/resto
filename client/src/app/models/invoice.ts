

import {Option} from './shared.models';

export interface LineItem {
	price: number;
	description: string;
	quantity: number;
	manufacturerCountry: string | null;
	exportReasonType: string;
}

export const reasons: Option[] = [
  {value: 'permanent', name: 'permanent'},
  {value: 'temporary', name: 'temporary'},
  {value: 'return', name: 'return'},
  {value: 'gift', name: 'gift'},
  {value: 'sample', name: 'sample'},
  {value: 'return_to_origin', name: 'return to origin'},
  {value: 'warranty_replacement', name: 'warranty replacement'},
  {value: 'personal_belongings_or_personal_use', name: 'personal belongings or personal use'},
  {value: 'used_exhibition_goods_to_origin', name: 'used exhibition goods to origin'},
  {value: 'intercompany_use', name: 'intercompany use'},
  {value: 'commercial_purpose_or_sale', name: 'commercial purpose or sale'},
  {value: 'diplomatic_goods', name: 'diplomatic goods'},
  {value: 'defence_material', name: 'defence material'},
];
