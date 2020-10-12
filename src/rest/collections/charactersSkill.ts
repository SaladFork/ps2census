import { requestFactory } from '../utils/requestHelpers';
import { characterSkill } from '../types/characterSkill';

export type typeData = characterSkill;

export type query = Partial<{
    character_id: string,
    last_save: string,
    last_save_date: string,
    skill_id: string
}>;

export const charactersSkill = requestFactory<'characters_skill'>('characters_skill');
