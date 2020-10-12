import { requestFactory } from '../utils/requestHelpers';
import { item } from '../types/item';
import { vehicle } from '../types/vehicle';
import { characterWeaponStatByFaction } from '../types/characterWeaponStatByFaction';

export type typeData = characterWeaponStatByFaction & {
    item: item, // item
    vehicle: vehicle, // vehicle
};

export type query = Partial<{
    character_id: string,
    item_id: string,
    last_save: string,
    last_save_date: string,
    stat_name: string,
    value_nc: string,
    value_tr: string,
    value_vs: string,
    vehicle_id: string
}>;

export type resolve =
    'item'
    | 'vehicle';

export const charactersWeaponStatByFaction = requestFactory<'characters_weapon_stat_by_faction'>('characters_weapon_stat_by_faction');
