import { expect, haveResource } from '@aws-cdk/assert'
import * as sst from '@serverless-stack/resources'
import AutoScalingGroup from '../lib/AutoScalingGroup'

test('Test Stack', () => {
  const app = new sst.App()
  // WHEN
  const stack = new AutoScalingGroup(app, 'test-stack')
  // THEN
  expect(stack).to(haveResource('AWS::Lambda::Function'))
})
