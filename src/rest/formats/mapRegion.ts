export interface mapRegion  {
    map_region_id: string;
    zone_id: string;
    facility_id: string;
    facility_name: string;
    facility_type_id: string;
    facility_type: string;
    location_x: string;
    location_y: string;
    location_z: string;
    reward_amount: string;
    reward_currency_id: string;
    [prop: string]: unknown;
}
