/*
///////////////////////////////////////////////////////////////
                File only for the route
///////////////////////////////////////////////////////////////
 */

//React
import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


//componant
import App from './App';

//config
import registerServiceWorker from './registerServiceWorker';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import NavbarFeatures from "./components/NavbarFeatures";

const Root = () =>{
    return(
        <div>
            <App/>
        </div>
    )
};

render(<Root />, document.getElementById('root'));
registerServiceWorker();
