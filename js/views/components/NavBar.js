import { createElement as h, render, Component } from "../../component";

let Navbar = {
    render: async () => {
        let view =  /*html*/`
            <div class="">
                <h5 class="my-0 mr-md-auto font-weight-normal"><a href="/#/">Projet JS</a></h5>
                <nav class="my-2 my-md-0 mr-md-3">
                <a class="p-2 text-dark" href="#">Features</a>
                <a class="p-2 text-dark" href="#">Enterprise</a>
                <a class="p-2 text-dark" href="#">Support</a>
                <a class="p-2 text-dark" href="#">Pricing</a>
                </nav>
                <a class="btn btn-outline-primary" href="/#/register">Register</a>
            </div>
        `
        return view
    },
    after_render: async () => { }

}

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return h('div', {className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"},
            h('div', null, `${this.state.value}`),
            h('button', {onClick: this.onPlusClick.bind(this)}, '+'),
        );
    }
}

export default Navbar;
