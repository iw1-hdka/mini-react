// --------------------------------
//  Parse a url and break it into resource, id and verb
// --------------------------------
export function parseRequestURL() {
  let r = (location.hash.slice(1).toLowerCase() || "/").split("/");

  let request = {
    resource: r[1],
    id: r[2],
    verb: r[3]
  };

  return request;
}
