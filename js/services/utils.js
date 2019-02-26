// --------------------------------
//  Parse a url and break it into resource, id and verb
// --------------------------------
export function parseRequestURL (url) {
    const [resource, id, verb] = (url.toLowerCase() || '/').split("/");

    return {resource, id, verb};
}
