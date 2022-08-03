import { VSFLogger } from '../../types';
declare let Logger: VSFLogger;
declare type LoggerImplementation = VSFLogger | ((verbosity: string) => VSFLogger);
declare const registerLogger: (loggerImplementation: LoggerImplementation, verbosity: string) => void;
export { Logger, registerLogger };