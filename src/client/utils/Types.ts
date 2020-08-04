import DuplicateFilter from './DuplicateFilter';
import { EventEmitter } from 'events';
import { PS2Environment } from '../../utils/Types';

export type ClientConfig = {
    serviceId?: string,
    environment?: PS2Environment,
    streamManagerConfig?: EventStreamManagerConfig
}

export type EventStreamManagerConfig = {
    subscriptions?: EventStreamSubscription[],
    streamConfig?: EventStreamConfig,
}

export type EventStreamConfig = {
    environment?: PS2Environment,
    connectionTimeout?: number,
    heartbeatInterval?: number,
    duplicateFilter?: DuplicateFilter | null,
    emitter?: EventEmitter,
}

export type EventStreamSubscription = {
    characters: string[],
    worlds?: string[],
    eventNames: string[],
    logicalAndCharactersWithWorlds?: boolean
} | {
    characters?: string[],
    worlds: string[],
    eventNames: string[],
    logicalAndCharactersWithWorlds?: boolean
}

export type EventStreamSubscribed = {
    characterCount: number,
    worlds: string[],
    eventNames: string[],
    logicalAndCharactersWithWorlds: boolean
}

