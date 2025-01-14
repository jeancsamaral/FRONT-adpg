import {
  createNota,
  getAllNotas,
  getNotaById,
  updateNota,
  createNotaItem,
  getNotaItems,
} from "./notaMethods";
import { NotasMethods } from '../../apiMethods';

export class ImplementedNotasMethods extends NotasMethods {
  createNota = createNota;
  getAllNotas = getAllNotas;
  getNotaById = getNotaById;
  updateNota = updateNota;
  createNotaItem = createNotaItem;
  getNotaItems = getNotaItems;
}

export const Implemented_Notas_Methods = new ImplementedNotasMethods();

export {
  createNota,
  getAllNotas,
  getNotaById,
  updateNota,
  createNotaItem,
  getNotaItems,
};
