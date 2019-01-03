export class Component {
  constructor (props = {}) {
    this.props = props;
    this.render(props);
  }

  shouldUpdate(newProps) {
    return JSON.stringify(this.props) !== JSON.stringify(newProps);
  }

  render() {
    return JSON.stringify(this.props);
  }

  display(newProps) {
    if (this.shouldUpdate(newProps)) {
      this.props = newProps;
      return this.render(newProps);
    }
  }
}
