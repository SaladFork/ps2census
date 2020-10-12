import { requestFactory } from '../utils/requestHelpers';
import { resistInfo } from '../types/resistInfo';

export type typeData = resistInfo;

export type query = Partial<{
    description: string,
    multiplier_when_headshot: string,
    resist_amount: string,
    resist_info_id: string,
    resist_percent: string,
    resist_type_id: string
}>;

export const resistInfo = requestFactory<'resist_info'>('resist_info');
