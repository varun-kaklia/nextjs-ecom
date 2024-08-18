import { RecoilKeys } from '@/constants/recoilKeys';
import { atom } from 'recoil';

export const discount = atom({
  key: RecoilKeys.DISCOUNT,
  default: {fixed:10,percentage:0},
});
