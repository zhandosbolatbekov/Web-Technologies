import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Playground from './Playground';
import Chess from './Chess';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Playground />, document.getElementById('root'));
registerServiceWorker();
