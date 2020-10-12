import { requestFactory } from '../utils/requestHelpers';
import { rewardSetToRewardGroup } from '../types/rewardSetToRewardGroup';

export type typeData = rewardSetToRewardGroup;

export type query = Partial<{
    reward_group_id: string,
    reward_set_id: string
}>;

export const rewardSetToRewardGroup = requestFactory<'reward_set_to_reward_group'>('reward_set_to_reward_group');
