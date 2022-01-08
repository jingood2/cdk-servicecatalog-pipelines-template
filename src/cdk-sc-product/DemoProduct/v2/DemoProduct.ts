import * as s3 from '@aws-cdk/aws-s3';
import * as servicecatalog from '@aws-cdk/aws-servicecatalog';
import { CfnParameter, Construct } from '@aws-cdk/core';

export class DemoProductV2 extends servicecatalog.ProductStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucketName = new CfnParameter(this, 'BucketName', {
      type: 'String',
      description: 'Test Bucket',
      default: 'jingood2SCTestBucket',
    });

    new s3.Bucket(this, 'BucketProduct', {
      bucketName: bucketName.valueAsString,
    });
  }
}