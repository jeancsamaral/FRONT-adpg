import { createRegionalPrice, getAllRegionalPrices, getFilteredRegionalPrices } from './regionalPricesMethods';
import { RegionalPricesMethods } from '../../apiMethods';

export class ImplementedRegionalPricesMethods extends RegionalPricesMethods {
  createRegionalPrice = createRegionalPrice;
  getAllRegionalPrices = getAllRegionalPrices;
  getFilteredRegionalPrices = getFilteredRegionalPrices;
}

export const Implemented_RegionalPrices_Methods = new ImplementedRegionalPricesMethods();