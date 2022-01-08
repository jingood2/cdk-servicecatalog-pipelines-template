import { App } from '@aws-cdk/core';
import { envVars } from './env-vars';
import { CdkPipelinesStack } from './lib/cdk-pipelines';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new CdkPipelinesStack(app, `${envVars.COMPANY_NAME}-${envVars.PROJECT_NAME}-pipelines`, { env: devEnv } );
app.synth();