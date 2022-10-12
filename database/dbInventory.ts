import { db } from '.';
import { Material } from '../models';

export const getMaterialById = async (_id: string) => {
  await db.connect();
  const material = await Material.findById(_id);
  await db.disconnect();

  if (!material) {
    return null;
  }

  return JSON.parse(JSON.stringify(material));
};
