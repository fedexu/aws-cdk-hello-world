
import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apiGateway = require('@aws-cdk/aws-apigateway');
import { HitCounter } from './hit-counter';

export class AwsCdkHelloWorldStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //definizione lambda 
    const hello = new lambda.Function(this, 'CDKTestHandler', {
     runtime: lambda.Runtime.NODEJS_12_X, 
     code: lambda.Code.asset('lambda') , 
     handler: 'hello.lambdaTest'
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      toCallLambda: hello
    });

    new apiGateway.LambdaRestApi(this , 'HelloLambdaTestApi', {
      handler: helloWithCounter.handler,
    });

  }
}
