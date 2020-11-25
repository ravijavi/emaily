import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

//this is the root file of our application, specifically for the front end

//ReactDOm expects a component instance in the first argument
ReactDOM.render(<App />, document.querySelector('#root')); //connects us to index.html file where 'root' is written (in the Public folder)