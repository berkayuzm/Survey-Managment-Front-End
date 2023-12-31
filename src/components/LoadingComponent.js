import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
function LoadingComponent() {
  return (
    <Segment>
    <Dimmer active inverted>
      <Loader size="large">Loading</Loader>
    </Dimmer>
    <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
  </Segment>
  )
}

export default LoadingComponent