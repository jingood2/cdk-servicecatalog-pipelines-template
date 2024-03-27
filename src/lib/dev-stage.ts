import * as cdk from '@aws-cdk/core';
import { MyStack } from './my-stack';
import { envVars } from '../env-vars';

export interface DevStageProps extends cdk.StageProps{

}

export class DevStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props: DevStageProps) {
    super(scope, id, props);

    new MyStack(this, `${envVars.PROJECT_NAME}-stack`);

  }
}