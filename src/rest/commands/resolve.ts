import { baseRequest, getIndex } from '../utils/Types';
import { setParam } from '../utils/Helpers';

export type resolveIndex = {};

export type resolveType<C> = getIndex<resolveIndex, C> | [getIndex<resolveIndex, C>, string[]];

export function resolveToString(resolve: (string | [string, string[]])[]): string {
    return resolve.map(r => Array.isArray(r) ? `${r[0]}(${r[1].join(',')})` : r).join(',');
}

export default function <C>(request: baseRequest<C>, resolve: resolveType<C>[]): baseRequest<C> {
    return setParam(request, 'c:resolve', resolveToString(resolve));
}
