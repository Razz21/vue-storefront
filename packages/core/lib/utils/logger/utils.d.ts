export declare type LogMessage = string[] | Error | Record<string, any> | string | boolean;
export declare const getMessage: (message: LogMessage) => string | undefined;
export declare const detectNode: boolean;
export declare const mountLog: (name: string, style: string) => string[];
