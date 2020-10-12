import { requestFactory } from '../utils/requestHelpers';
import { playerState } from '../types/playerState';

export type typeData = playerState;

export type query = Partial<{
    description: string,
    player_state_id: string
}>;

export const playerState = requestFactory<'player_state'>('player_state');
