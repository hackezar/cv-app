/* eslint-disable react/prop-types */
import { useState } from 'react'

// Components
import { CollectDataApp } from './CollectData'

function App() {

  return (
    <>
      <CollectDataApp />
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