import { baseRequest } from '../utils/Types';
import { setParam } from '../utils/Helpers';

export default function <C>(request: baseRequest<C>, timing = true): baseRequest<C> {
    return setParam(request, 'c:timing', timing);
}
