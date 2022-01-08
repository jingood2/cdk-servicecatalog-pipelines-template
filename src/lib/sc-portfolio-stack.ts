import * as iam from '@aws-cdk/aws-iam';
import * as servicecatalog from '@aws-cdk/aws-servicecatalog';
import * as cdk from '@aws-cdk/core';
import fg from 'fast-glob';
import * as handlers from '../cdk-sc-product/index';
//import path from 'path';

enum SCProductType {
  CDK='cdk-sc-product',
  CFN='cfn-sc-product'
}

export interface SCPortfolioProductStackProps extends cdk.StackProps {
  portfolioname: string;
  codeType: SCProductType;
  accessUserName?: string;
  accessGroupName?: string;
  accessRoleArn?: string;
}

export class SCPortfolioProductStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: SCPortfolioProductStackProps) {
    super(scope, id, props);

    // define resources here...
    const portfolio = new servicecatalog.Portfolio(this, 'AWSTFMgmtPortfolio', {
      displayName: props.portfolioname,
      providerName: 'AWSTF Team',
      description: 'Portfolio for a project',
      messageLanguage: servicecatalog.MessageLanguage.EN,
    });

    if ( props.accessGroupName != undefined) {
      const group = iam.Group.fromGroupName(this, 'SCGroup', props.accessGroupName);
      portfolio.giveAccessToGroup(group);
    }
    if ( props.accessUserName != undefined) {
      const user = iam.User.fromUserName(this, 'SCUser', props.accessUserName);
      portfolio.giveAccessToUser(user);
    }
    if ( props.accessRoleArn != undefined) {
      const role = iam.Role.fromRoleArn(this, 'SCRole', props.accessRoleArn);
      portfolio.giveAccessToRole(role);
    }


    const entries = fg.sync('src/cdk-sc-product/**', { onlyFiles: false, deep: 2 });
    entries.forEach(entry => {
      const temp = entry.split('/');
      const product = new servicecatalog.CloudFormationProduct(this, 'Product', {
        productName: temp[2],
        owner: 'Product Owner',
        productVersions: [
          {
            productVersionName: temp[3],
            cloudFormationTemplate: servicecatalog.CloudFormationTemplate.fromProductStack(this.getInstance(temp[2], 'S3BucketProduct', { displayName: 'SCProductFactory' }),
            ),
          },
        ],
      });
      portfolio.addProduct(product);


    });

  }

  private getInstance(name: string, ...args: any[]) {
    return new ( <any>handlers)[name](...args);
  }
}