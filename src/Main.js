import React from 'react'
import SearchPage from './SearchPage'

const Main = () => {
  return (
    <div>
      <div>
        <h1>תוכי אבוד?</h1>
        <p>כאן תוכלו לאתר את פרטי התוכי בקלות ומהירות!</p>
      </div>
      {<SearchPage />}
    </div>
  )
}

export default Main