import { requestFactory } from '../utils/Helpers';
import { commands, operations } from '../utils/Types';
import character from '../types/character';
import characterStatHistory from '../types/characterStatHistory';
import event from '../types/event';

export type typeData = event & {
    character: character & { // character/character_name
        stats: {
            stat_history: characterStatHistory[], // characters_stat_history
        },
    },
};

export type query = Partial<{
    after: string,
    before: string,
    type: string
}>;

// TODO: Find associated attacker* types
export type resolve =
    'character' //
    | 'character_name' //
    | 'characters_stat_history' //
    | 'attacker'
    | 'attacker_name'
    | 'attackers_stat_history';

export default requestFactory<operations, query, typeData[], commands, resolve>('event');
