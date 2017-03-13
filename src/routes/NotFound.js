import React from 'react';
import Helmet from 'react-helmet';
import title from '../utils/title'



const NotFound = () =>
    <div className="text-center mt pt">
        <Helmet title={title.notFound}/>
        <h2 ><strong>404</strong>. Page not found</h2>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>

export default NotFound;
