#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { AwsCdkHelloWorldStack } from '../lib/aws-cdk-hello-world-stack';

const app = new cdk.App();
new AwsCdkHelloWorldStack(app, 'AwsCdkHelloWorldStack');