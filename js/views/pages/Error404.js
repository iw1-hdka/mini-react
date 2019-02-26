import { createElement as h } from "../../miniDOM.js";

const Error404 = () => h(
    "section",
    {className: "section"},
    h("h1", null, "Cette page n'existe pas")
);

export default Error404;
