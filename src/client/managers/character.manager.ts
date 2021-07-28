import {CacheContract} from '../concerns/cache.contract';
import {GetQuery} from '../../rest';
import {CensusClient} from '../census.client';
import {MaxRetryException} from '../exceptions/max-retry.exception';
import {LocalCache} from '../utils/local.cache';

export interface CharacterManagerOptions {
    retries?: number;
    query?: (query: GetQuery<'character'>) => GetQuery<'character'>;
    cache?: CacheContract;
}

export class CharacterManager {
    private readonly query: GetQuery<'character'>;

    private readonly cache: CacheContract;

    private readonly maxRetries: number;

    constructor(
        readonly client: CensusClient,
        {
            retries,
            query,
            cache
        }: CharacterManagerOptions = {}
    ) {
        this.query = this.client.rest.get('character');
        if (query)
            this.query = query(this.query);

        this.maxRetries = retries ?? 1;

        this.cache = cache ?? new LocalCache();
    }

    async fetch(id: string, force = false): Promise<any> {
        // TODO: Multiple request can now run simultaneous while retrieving the same thing
        if (!force) {
            const cache = await this.cache.fetch(id);

            if (cache) return cache;
        }

        const data = await this.request(id);
        await this.cache.put(id, data);

        return data;
    }

    private async request(id: string): Promise<any> {
        const conditions = {character_id: id};
        let retries = this.maxRetries;
        const attempts = [];

        this.client.emit('debug', `Fetching character with id "${id}" from Census`, CharacterManager.name);

        do {
            try {
                const data = await this.query.get(this.client.environment, conditions);

                if (data.length <= 0)
                    throw new Error(`Census did not return a character for "${id}"`);

                return data[0];
            } catch (e) {
                attempts.push(e);
            }

            retries--;
        } while (retries > 0);

        throw new MaxRetryException('character', conditions, attempts);
    }
}