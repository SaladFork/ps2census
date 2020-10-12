import { EventStreamSubscription } from './types/Client';
import { Client } from './Client';
import { EventStream } from './EventStream';
import { Events } from './constants/Client';
import { PS2EventNames } from './types/PS2Events';

export class SubscriptionManager {
    private static readonly label = 'SubscriptionManager';

    /**
     * Characters subscribed to
     */
    private readonly characters: Set<string>;

    /**
     * Worlds subscribed to
     */
    private readonly worlds: Set<string>;

    /**
     * Events to listen to
     */
    private readonly eventNames: Set<'all' | PS2EventNames>;

    /**
     * Whether both worlds and characters should match
     */
    private logicalAndCharactersWithWorlds: boolean;

    /**
     * @param {Client} client the client used to emit debug events
     * @param {EventStream} stream the stream to comment, like, and subscribe to
     * @param {EventStreamSubscription} subscription the initial subscription
     */
    public constructor(
        private readonly client: Client,
        private readonly stream: EventStream,
        subscription: EventStreamSubscription = {},
    ) {
        this.characters = new Set(subscription.characters);
        this.worlds = new Set(subscription.worlds);
        this.eventNames = new Set(subscription.eventNames);
        this.logicalAndCharactersWithWorlds = subscription.logicalAndCharactersWithWorlds ?? false;

        this.registerClientEvents();
    }

    /**
     * Registers important stream events
     */
    private registerClientEvents(): void {
        this.stream.on(Events.STREAM_READY, () => {
            this.client.emit(Events.DEBUG, `Subscribing to events`, SubscriptionManager.label);

            void this.stream.subscribe(this.subscription);
        });
    }

    /**
     * Make a subscription to the stream
     *
     * @param {EventStreamSubscription} subscription
     * @return {Promise<boolean>} whether it has been run(depends on stream being ready)
     */
    public async subscribe(subscription: EventStreamSubscription): Promise<boolean> {
        subscription.characters?.forEach(this.characters.add);
        subscription.worlds?.forEach(this.worlds.add);
        subscription.eventNames?.forEach(this.eventNames.add);

        if (this.stream.isReady) {
            await this.stream.subscribe(subscription);

            return true;
        }

        return false;
    }

    /**
     * Remove a subscription from the stream
     *
     * @param {EventStreamSubscription} subscription
     * @return {Promise<boolean>} whether it has been run(depends on stream being ready)
     */
    public async unsubscribe(subscription: EventStreamSubscription): Promise<boolean> {
        subscription.characters?.forEach(this.characters.delete);
        subscription.worlds?.forEach(this.worlds.delete);
        subscription.eventNames?.forEach(this.eventNames.delete);

        if (subscription.logicalAndCharactersWithWorlds)
            this.logicalAndCharactersWithWorlds = subscription.logicalAndCharactersWithWorlds;

        if (this.stream.isReady) {
            await this.stream.unsubscribe(subscription);

            return true;
        }

        return false;
    }

    /**
     * Purge all subscriptions
     *
     * @return {Promise<boolean>} whether it has been run(depends on stream being ready)
     */
    public async unsubscribeAll(): Promise<boolean> {
        this.characters.clear();
        this.worlds.clear();
        this.eventNames.clear();
        this.logicalAndCharactersWithWorlds = false;

        if (this.stream.isReady) {
            await this.stream.unsubscribeAll();

            return true;
        }

        return false;
    }

    /**
     * Rerun all subscriptions
     *
     * @param {boolean} reset When true unsubscribes to all events first
     * @return {Promise<boolean>} whether it has been run(depends on stream being ready)
     */
    public async resubscribe(reset = false): Promise<boolean> {
        if (this.stream.isReady) {
            if (reset) await this.unsubscribeAll();

            await this.stream.subscribe(this.subscription);

            return true;
        }

        return false;
    }

    /**
     * Get current subscription
     *
     * @return {EventStreamSubscription}
     */
    public get subscription(): EventStreamSubscription {
        return {
            characters: Array.from(this.characters),
            worlds: Array.from(this.worlds),
            eventNames: Array.from(this.eventNames),
            logicalAndCharactersWithWorlds: this.logicalAndCharactersWithWorlds,
        };
    }
}
