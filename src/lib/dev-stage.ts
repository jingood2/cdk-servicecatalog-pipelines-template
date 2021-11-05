import * as cdk from '@aws-cdk/core';
import { envVars } from '../env-vars';
import { MyStack } from './my-stack';

export interface DevStageProps extends cdk.StageProps{

}

export class DevStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props: DevStageProps) {
    super(scope, id, props);

    new MyStack(this, `${envVars.PROJECT_NAME}-stack`);

  }
}