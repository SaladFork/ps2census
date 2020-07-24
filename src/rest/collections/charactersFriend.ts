import { requestFactory } from '../utils/Helpers';
import { commands, operations } from '../utils/Types';
import characterFriends from '../types/characterFriends';
import character from '../types/character';

export type typeData = characterFriends & {
    friend_list: (character & { world_id: string })[], // character/character_name and world
};

export type query = { character_id: string };

export type resolve =
    'character'
    | 'character_name'
    | 'world';

export default requestFactory<operations, query, typeData[], commands, resolve>('characters_friend');
