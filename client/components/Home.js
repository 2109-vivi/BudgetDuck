import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {firstName} = props

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <p>Use the navigation above to navigate the site.</p>
      <p>This will eventually become your dashboard</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.auth.firstName
  }
}

export default connect(mapState)(Home)
