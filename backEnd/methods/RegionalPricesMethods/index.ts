import { createRegionalPrice, getAllRegionalPrices } from './regionalPricesMethods';
import { RegionalPricesMethods } from '../../apiMethods';

export class Implemented_RegionalPrices_Methods extends RegionalPricesMethods {
  public createRegionalPrice = createRegionalPrice;
  public getAllRegionalPrices = getAllRegionalPrices;
}