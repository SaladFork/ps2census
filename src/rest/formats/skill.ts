import { Lang } from '../types/response';

export interface skill {
    skill_id: string;
    skill_line_id: string;
    skill_line_index: string;
    skill_points: string;
    grant_item_id: string;
    name: Lang;
    description: Lang;
    image_set_id: string;
    image_id: string;
    image_path: string
}
