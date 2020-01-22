import React from 'react';
import './PageNotFound.css';
import util from '../../util/util';

const PageNotFound = (props) => {
    return <div id="notfound">
        <div class="notfound">
            <div class="notfound-404"></div>
            <h1>404</h1>
            <h2>Oops! Page Not Be Found</h2>
            <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
            <a href={util.routes.overview}>Back to homepage</a>
        </div>
    </div>
}

export default PageNotFound;