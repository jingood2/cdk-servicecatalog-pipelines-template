import { App, Aws, Construct, Stack, StackProps } from '@aws-cdk/core';
import { CdkPipelinesStack } from './lib/cdk-pipelines';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  //account: process.env.CDK_DEFAULT_ACCOUNT,
  //region: process.env.CDK_DEFAULT_REGION,
  account: Aws.ACCOUNT_ID,
  regtion: Aws.REGION,
};

const app = new App();

new CdkPipelinesStack(app, 'CdkPipelines', { env: devEnv } );
app.synth();