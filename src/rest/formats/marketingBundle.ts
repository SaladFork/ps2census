import { lang } from '../types/response';

export type marketingBundle = {
    marketing_bundle_id: string,
    name: lang,
    description: lang,
    image_id: string,
    station_cash_price: string,
    cert_price: string,
    release_time: string,
    [prop: string]: any,
};
