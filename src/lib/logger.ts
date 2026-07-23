export interface MDCContext {
  traceId: string;
  path?: string;
  method?: string;
  userId?: string;
  [key: string]: unknown;
}

let asyncLocalStorageInstance: any = null;

if (typeof window === 'undefined') {
  try {
    // Dynamically require node:async_hooks only on server side
    const { AsyncLocalStorage } = require('node:async_hooks');
    asyncLocalStorageInstance = new AsyncLocalStorage();
  } catch {
    // Fallback if async_hooks is unavailable
  }
}

let fallbackClientStore: MDCContext = { traceId: 'client-default' };

export function generateTraceId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `tr-${crypto.randomUUID()}`;
  }
  return `tr-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function runWithMDC<T>(context: MDCContext, callback: () => T): T {
  if (asyncLocalStorageInstance) {
    return asyncLocalStorageInstance.run(context, callback);
  }
  fallbackClientStore = context;
  return callback();
}

export function getMDC(): MDCContext {
  if (asyncLocalStorageInstance) {
    const store = asyncLocalStorageInstance.getStore();
    if (store) return store;
  }
  return fallbackClientStore;
}

export function setMDC(key: string, value: unknown): void {
  const store = getMDC();
  if (store) {
    store[key] = value;
  }
}

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

export interface LogPayload {
  timestamp: string;
  level: LogLevel;
  status: number;
  message: string;
  mdc: MDCContext;
  error?: {
    name?: string;
    message?: string;
    stack?: string;
  };
  extra?: Record<string, unknown>;
}

function formatError(error?: unknown) {
  if (!error) return undefined;
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return {
    message: String(error),
  };
}

export function logHttp(
  statusCode: number,
  message: string,
  extra?: Record<string, unknown>,
  error?: unknown
): void {
  const mdc = getMDC();
  const timestamp = new Date().toISOString();

  let level: LogLevel = 'INFO';
  if (statusCode >= 500) {
    level = 'ERROR';
  } else if (statusCode >= 300) {
    level = 'WARN';
  }

  const payload: LogPayload = {
    timestamp,
    level,
    status: statusCode,
    message,
    mdc,
    ...(extra && Object.keys(extra).length > 0 ? { extra } : {}),
    ...(error ? { error: formatError(error) } : {}),
  };

  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const badge =
      statusCode >= 500
        ? '🚨 [5xx ERROR]'
        : statusCode >= 400
        ? '⚠️ [4xx CLIENT ERROR]'
        : statusCode >= 300
        ? '🔀 [3xx FALLBACK/REDIRECT]'
        : '✅ [2xx SUCCESS]';

    console.log(`${badge} [${timestamp}] (${mdc.traceId}) ${message}`, {
      status: statusCode,
      path: mdc.path,
      ...(payload.error ? { error: payload.error } : {}),
      ...(payload.extra ? { extra: payload.extra } : {}),
    });
  } else {
    console.log(JSON.stringify(payload));
  }
}

export const logger = {
  info(message: string, extra?: Record<string, unknown>) {
    logHttp(200, message, extra);
  },
  warn(message: string, extra?: Record<string, unknown>) {
    logHttp(300, message, extra);
  },
  error(message: string, error?: unknown, extra?: Record<string, unknown>) {
    logHttp(500, message, extra, error);
  },
  logHttp,
};
