import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { envVars } from '../env-vars';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    // define resources here...
    new s3.Bucket(this, 'MyEncryptedBucket', {
      bucketName: `${envVars.COMPANY_NAME}-${envVars.PROJECT_NAME}-demo`,
      encryption: s3.BucketEncryption.KMS,
      bucketKeyEnabled: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
  }
}