import { PlayerFacilityDefendData } from '../utils/PS2Events';
import { Events } from '../utils/Constants';
import CharacterEvent from './CharacterEvent';

export default class PlayerFacilityDefend extends CharacterEvent implements PlayerFacilityDefendData {
    public readonly emit = Events.PS2_DEFEND;

    public readonly event_name: 'PlayerFacilityDefend';
    public readonly facility_id: string;
    public readonly outfit_id: string;
    public readonly zone_id: string;

    public toHash(): string {
        return `PlayerFacilityDefend:${this.character_id}:${this.timestamp}`;
    }
}
