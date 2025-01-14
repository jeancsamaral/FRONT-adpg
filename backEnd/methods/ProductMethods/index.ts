import { getProducts, createProducts } from './productMethods';
import { ProductMethods } from '../../apiMethods';

export class ImplementedProductMethods extends ProductMethods {
    getProducts = getProducts;
    createProducts = createProducts;
}

export const Implemented_Product_Methods = new ImplementedProductMethods();