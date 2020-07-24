import { requestFactory } from '../utils/Helpers';
import { commands, operations } from '../utils/Types';
import characterDirectiveTree from '../types/characterDirectiveTree';

export type typeData = characterDirectiveTree;

export type query = Partial<{
    character_id: string,
    completion_time: string,
    completion_time_date: string,
    current_directive_tier_id: string,
    current_level: string,
    directive_tree_id: string
}>;

export type resolve = never;

export default requestFactory<operations, query, typeData[], commands, resolve>('characters_directive_tree');
