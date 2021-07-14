import * as sst from '@serverless-stack/resources'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as autoscaling from '@aws-cdk/aws-autoscaling'

export default class AutoScalingGroup extends sst.Stack {
  constructor (scope, id, props) {
    super(scope, id, props)

    // eslint-disable-next-line no-new
    new autoscaling.AutoScalingGroup(this, 'ASG', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      // eslint-disable-next-line new-cap
      machineImage: new ec2.MachineImage.lookup({
        'us-east-1': 'ami-09e67e426f25ce0d7'
      })
    })

    // Create a HTTP API
    const api = new sst.Api(this, 'Api', {
      routes: {
        'GET /': 'src/lambda.handler'
      }
    })

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url
    })
  }
}
