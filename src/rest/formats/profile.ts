import { Lang } from '../types/response';

export interface profile  {
    profile_id: string;
    profile_type_id: string;
    profile_type_description: string;
    faction_id: string;
    name: Lang;
    description: Lang;
    image_set_id: string;
    image_id: string;
    image_path: string;
    movement_speed: string;
    backpedal_speed_modifier: string;
    sprint_speed_modifier: string;
    strafe_speed_modifier: string;
    [prop: string]: unkown;
}
