import { App } from './app.js';

const root = document.getElementById('root');

root.innerHTML = (new App()).display({name: 'Hugo'});
