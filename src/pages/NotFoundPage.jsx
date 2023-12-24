import React from 'react'
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='page-not-found'>
      <img src="/404-Page.png" alt="404-page-not-found! Something went wrong!" />
      <div className='_404-message'>
      <div>View exciting offers on our <Link to="/">Home Page</Link>.</div>
      <div>Use the Search bar on top of this page to discover products of interest.</div>
      </div>
    </div>
  )
}

;export default NotFoundPage;