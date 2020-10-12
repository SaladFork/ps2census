import { requestFactory } from '../utils/requestHelpers';
import { map } from '../types/map';

export type typeData = map;

export type query = {
    world_id: string,
    zone_ids: string
};

export const map = requestFactory<'map'>('map');
