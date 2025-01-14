import { createMemo, getMemoByCodcli } from './memoMethods';
import { MemoMethods } from '../../apiMethods';

export class ImplementedMemoMethods extends MemoMethods {
  createMemo = createMemo;
  getMemoByCodcli = getMemoByCodcli;
}

export const Implemented_Memo_Methods = new ImplementedMemoMethods();