import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const sdk: NodeSDK = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
        [SemanticResourceAttributes.SERVICE_VERSION]: '1.0',
    }),
    traceExporter: new ConsoleSpanExporter(),
});

console.log('Starting OTEL SDK ...');
sdk.start();

process.on('beforeExit', async (code: number): Promise<void> => {
    console.log('Shutting down OTEL SDK ...');
    await sdk.shutdown();
});
