import { requestFactory } from '../utils/requestHelpers';

export { projectile as projectileFormat } from '../formats/projectile';

export type projectileQuery = Partial<{
    acceleration: string,
    arm_distance: string,
    detonate_distance: string,
    detonate_on_contact: string,
    drag: string,
    gravity: string,
    lifespan: string,
    lockon_acceleration: string,
    lockon_lifespan: string,
    lockon_lose_angle: string,
    lockon_seek_in_flight: string,
    projectile_flight_type_id: string,
    projectile_id: string,
    speed: string,
    speed_max: string,
    sticks_to_players: string,
    sticky: string,
    tether_distance: string,
    turn_rate: string
}>;

export const projectile = requestFactory<'projectile'>('projectile');
