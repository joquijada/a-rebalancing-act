import * as sst from '@serverless-stack/resources'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as autoscaling from '@aws-cdk/aws-autoscaling'
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2'

export default class AutoScalingGroup extends sst.Stack {
  constructor (scope, id, props) {
    super(scope, id, props)

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      tags: {
        Name: 'qamaint'
      }
    })

    const autoScalingGroup = new autoscaling.AutoScalingGroup(this, 'ASG', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      // eslint-disable-next-line new-cap
      machineImage: ec2.MachineImage.genericLinux({
        'us-east-1': 'ami-09e67e426f25ce0d7'
      })
    })

    const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
      vpc,
      internetFacing: true
    })

    const listener = lb.addListener('Listener', {
      port: 80
    })

    listener.addTargets('Target', {
      port: 80,
      targets: [autoScalingGroup]
    })

    // listener.connections.allowDefaultPortFromAnyIpv4('Open to the world')

    // autoScalingGroup.scaleOnRequestCount('AModestLoad', {
    //  targetRequestsPerSecond: 1
    // })

    // Show the endpoint in the output
    this.addOutputs({
      AutoScalingGroup: autoScalingGroup.autoScalingGroupArn
    })
  }
}
