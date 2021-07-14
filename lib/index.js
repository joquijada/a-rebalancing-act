import AutoScalingGroup from './AutoScalingGroup'

export default function main (app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: 'nodejs12.x'
  })

  // eslint-disable-next-line no-new
  new AutoScalingGroup(app, 'my-stack')

  // Add more stacks
}
