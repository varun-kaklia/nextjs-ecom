import { RecoilKeys } from '@/constants/recoilKeys';
import { atom } from 'recoil';

export const cartState = atom({
  key: RecoilKeys.CART_STATE,
  default: [],
});
