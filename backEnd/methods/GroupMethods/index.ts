import { createGroup } from './groupMethods';
import { GroupMethods } from '../../apiMethods';

export class ImplementedGroupMethods extends GroupMethods {
  createGroup = createGroup;
}

export const Implemented_Group_Methods = new ImplementedGroupMethods();