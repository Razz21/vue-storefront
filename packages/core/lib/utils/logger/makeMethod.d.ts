import { LogName } from './types';
export declare function makeMethod(logEnum: LogName, fn: Function): () => any;