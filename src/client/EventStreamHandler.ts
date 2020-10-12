import { EventStreamHandler as EventStreamHandlerContract } from './concerns/EventStreamHandler';
import { PS2EventData } from './types/PS2Events';
import { EventStreamFilter } from './concerns/EventStreamFilter';
import { PS2Event } from './events/PS2Event';
import { Client } from './Client';
import { Events } from './constants/Client';
import { endpointsToId } from './constants/PS2';

import { AchievementEarned } from './events/AchievementEarned';
import { BattleRankUp } from './events/BattleRankUp';
import { ContinentLock } from './events/ContinentLock';
import { ContinentUnlock } from './events/ContinentUnlock';
import { Death } from './events/Death';
import { FacilityControl } from './events/FacilityControl';
import { GainExperience } from './events/GainExperience';
import { ItemAdded } from './events/ItemAdded';
import { MetagameEvent } from './events/MetagameEvent';
import { PlayerFacilityCapture } from './events/PlayerFacilityCapture';
import { PlayerFacilityDefend } from './events/PlayerFacilityDefend';
import { PlayerLogin } from './events/PlayerLogin';
import { PlayerLogout } from './events/PlayerLogout';
import { SkillAdded } from './events/SkillAdded';
import { VehicleDestroy } from './events/VehicleDestroy';
import { stringToBoolean } from '../utils/Formatters';

export class EventStreamHandler implements EventStreamHandlerContract {
    public static endpointsToId = endpointsToId;

    /**
     * @param {Client} client
     * @param {EventStreamFilter} filter
     */
    public constructor(
        private readonly client: Client,
        private readonly filter: EventStreamFilter,
    ) {
    }

    /**
     * Handles the event
     *
     * @param {PS2EventData} event
     */
    public handleEvent(event: PS2EventData): void {
        const wrapped = this.wrapEvent(event);

        if (!this.filter.filter(wrapped)) {
            setImmediate(() => {
                this.client.emit(Events.PS2_EVENT, wrapped);
                this.client.emit(wrapped.emit, wrapped);
            });
        } else {
            setImmediate(() => {
                this.client.emit(Events.PS2_DUPLICATE, wrapped);
            });
        }
    }

    /**
     * Handler whenever a subscription notification comes in
     *
     * @param subscription
     */
    public handleSubscription(subscription: any): void {
        setImmediate(() => {
            this.client.emit(Events.PS2_SUBSCRIBED, subscription);
        });
    }

    /**
     * Handler whenever a service state changed notification comes in
     *
     * @param state
     */
    public handleServerStateChanged(state: any): void {
        const id = EventStreamHandler.endpointsToId.get(state.detail);

        if (id) {
            const online = stringToBoolean(state.online);

            setImmediate(() => {
                this.client.emit(Events.PS2_SERVICE_STATE, id, online);
            });
        }
    }

    /**
     * Factory that wraps events, I don't know what more to say
     *
     * @param {PS2EventData} event
     * @return {PS2Event}
     */
    private wrapEvent(event: PS2EventData): PS2Event {
        switch (event.event_name) {
            case 'AchievementEarned':
                return new AchievementEarned(this.client, event);
            case 'BattleRankUp':
                return new BattleRankUp(this.client, event);
            case 'ContinentLock':
                return new ContinentLock(this.client, event);
            case 'ContinentUnlock':
                return new ContinentUnlock(this.client, event);
            case 'Death':
                return new Death(this.client, event);
            case 'FacilityControl':
                return new FacilityControl(this.client, event);
            case 'GainExperience':
                return new GainExperience(this.client, event);
            case 'ItemAdded':
                return new ItemAdded(this.client, event);
            case 'MetagameEvent':
                return new MetagameEvent(this.client, event);
            case 'PlayerFacilityCapture':
                return new PlayerFacilityCapture(this.client, event);
            case 'PlayerFacilityDefend':
                return new PlayerFacilityDefend(this.client, event);
            case 'PlayerLogin':
                return new PlayerLogin(this.client, event);
            case 'PlayerLogout':
                return new PlayerLogout(this.client, event);
            case 'SkillAdded':
                return new SkillAdded(this.client, event);
            case 'VehicleDestroy':
                return new VehicleDestroy(this.client, event);
        }
    }
}
