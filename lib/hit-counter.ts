import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import dynamodb = require('@aws-cdk/aws-dynamodb');

export interface HitCounterProps {
    /** the function for which we want to count url hits **/
    toCallLambda: lambda.IFunction;
}

export class HitCounter extends cdk.Construct {

    /** allows accessing the counter function */
    public readonly handler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
        super(scope, id);

        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
        });

        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.asset('lambda'),
            handler: 'hit-counter.counterHandler',
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.toCallLambda.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });

        table.grantReadWriteData(this.handler);

        props.toCallLambda.grantInvoke(this.handler);
    }
}