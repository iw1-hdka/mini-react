import { App } from './app.js';
import Protos from './prototypes.js';

const root = document.getElementById('root');

root.innerHTML = (new App()).display({name: 'Hugo'});
