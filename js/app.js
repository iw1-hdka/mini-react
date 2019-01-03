import { Component } from './component.js';

export class App extends Component {
  render() {
    return `<div>Hello <strong>${this.props.name}</strong></div>`;
  }
}
