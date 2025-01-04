import { Message } from 'primereact/message'
import { useState } from 'react'

import * as pack from '../../../package.json'

const Home = () => {
  const [headline] = useState(pack.name)
  return (
    <>
      <h1 className="text-3xl text-blue-500 capitalize mb-4">{headline}</h1>
      <div className="mb-4">
        <Message text={'Logged in an ready to go!'} />
      </div>
    </>
  )
}

export default Home
