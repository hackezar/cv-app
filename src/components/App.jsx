/* eslint-disable react/prop-types */
import { useState } from 'react'

// Components
import { CollectDataApp } from './CollectData'
import {Resume} from './Resume.jsx'
import {HomeScreen} from './HomeScreen.jsx'

function App() {
  const [appActiveIndex, setAppActiveIndex] = useState(0)
  const createResume = () => setAppActiveIndex(2)
  const renderCollectData = () => setAppActiveIndex(1)
  return (
    <>
      <HomeScreen activeApp = {appActiveIndex === 0}
      renderCollectData={renderCollectData}
      />
      <CollectDataApp activeApp = {appActiveIndex === 1}
       createResume = {createResume}
       startingSection = {0}
      />
      <Resume activeApp = {appActiveIndex === 2}
      returnToInfoEditor={renderCollectData}
      />
    </>
  )
}

function Header() {
  return(
    <div className="header">
      <h1 className="headerh1">Resume Builder</h1>
      <h3>Enter your information</h3>
    </div>
  )
}


export {App, Header}