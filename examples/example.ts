import {
    trace,
    Tracer,
    Span,
    SpanStatusCode,
} from '@opentelemetry/api';

const { version } = require('../package.json');
const tracer: Tracer = trace.getTracer('booking-service', version);

async function _doWork(millis: number): Promise<void> {
    await new Promise(r => setTimeout(r, millis));
}

async function authenticateUser(): Promise<void> {
    return tracer.startActiveSpan('authenticate-user', async (span: Span): Promise<void> => {
        try {
            console.debug('Authenticating user ...');
            await _doWork(500);
            console.debug('User authenticated');
        } finally {
            span.end();
        }
    });
}

async function validateBooking(): Promise<void> {
    return tracer.startActiveSpan('validate-booking', async (span: Span): Promise<void> => {
        try {
            console.debug('Validating booking ...');
            await _doWork(1000);
            console.debug('Booking validated');
        } finally {
            span.end();
        }
    });
}

async function doBooking(): Promise<void> {
    return tracer.startActiveSpan('do-booking', async (span: Span): Promise<void> => {
        try {
            console.info('Doing booking ...');
            await _doWork(2000);
            console.info('Booking completed');
        } finally {
            span.end();
        }
    });
}

async function handleRequest(): Promise<void> {
    return tracer.startActiveSpan('handle-request', async (span: Span): Promise<void> => {
        try {
            console.log('Handling request ...');

            await authenticateUser();

            await validateBooking();

            await doBooking();

            console.log('Request handled');
        } catch (err: any) {
            console.error('Unable to handle request:', err);

            span.recordException(err);
            span.setStatus({
                code: SpanStatusCode.ERROR,
                message: err.message
            });
            throw err;
        } finally {
            span.end();
        }
    });
}

handleRequest();
