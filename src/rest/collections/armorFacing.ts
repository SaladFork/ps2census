import { requestFactory } from '../utils/requestHelpers';
import { armorFacing } from '../types/armorFacing';

export type typeData = armorFacing;

export type query = Partial<{
    armor_facing_id: string,
    description: string
}>;

export const armorFacing = requestFactory<'armor_facing'>('armor_facing');
