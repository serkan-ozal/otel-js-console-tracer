import { context, trace, SpanContext } from '@opentelemetry/api';

const CONSOLE_METHODS: string[] = [
    'trace',
    'debug',
    'info',
    'log',
    'warn',
    'error',
];
export enum LogLevel {
    NONE = 0,
    TRACE = 1,
    DEBUG = 2,
    INFO = 3,
    LOG = 3,
    WARN = 4,
    ERROR = 5,
}

const configuredLogLevelName: string | undefined =
    process.env['OTEL_CONSOLE_TRACER_LOG_LEVEL'];
const configuredLogLevel: LogLevel = _getLogLevel(configuredLogLevelName);
let initialized: boolean = false;

function _getLogLevel(logLevelName: string | undefined): LogLevel {
    return logLevelName && LogLevel[logLevelName as keyof typeof LogLevel]
        ? LogLevel[logLevelName as keyof typeof LogLevel]
        : LogLevel.NONE;
}

function _patchConsole(): void {
    const consoleRef: any = console;
    CONSOLE_METHODS.forEach((method: string): void => {
        const consoleMethod: any = consoleRef[method];

        // Check whether console method is valid and/or patched before
        if (!consoleMethod || consoleMethod._otel_console_tracer) {
            return;
        }

        const logLevelName: string = method.toUpperCase();
        const logLevel: LogLevel = _getLogLevel(logLevelName);
        const originalConsoleMethod: any = consoleRef[method].bind(console);

        const wrapperConsoleMethod = (...args: any[]): void => {
            if (logLevel >= configuredLogLevel) {
                const currentSpanContext: SpanContext | undefined =
                    trace.getSpanContext(context.active());
                if (currentSpanContext) {
                    originalConsoleMethod.call(
                        console,
                        `[${logLevelName}] - ${currentSpanContext.traceId} / ${currentSpanContext.spanId} |`,
                        ...args
                    );
                } else {
                    originalConsoleMethod.call(
                        console,
                        `[${logLevelName}] |`,
                        ...args
                    );
                }
            }
        };

        // Mark console method to prevent further double patching
        Object.defineProperty(wrapperConsoleMethod, '_otel_console_tracer', {
            value: true,
            writable: false,
        });
        consoleRef[method] = wrapperConsoleMethod;
    });
}

function _init(): void {
    _patchConsole();
}

export function init(): void {
    if (!initialized) {
        _init();
        initialized = true;
    }
}
