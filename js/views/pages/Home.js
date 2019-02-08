// --------------------------------
//  Define Data Sources
// --------------------------------

let getPostsList = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts`,
      options
    );
    const json = await response.json();
    // console.log(json)
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

let Home = {
  render: async () => {
    let posts = await getPostsList();
    let view = /*html*/ `
           <section class="section">
               <h1> Latests articles </h1>
               <div class="container">
                   ${posts.slice(0, 5)
                     .map(
                       post =>
                         /*html*/ `
                            <div class="card flex-md-row mb-4 box-shadow h-md-250">
                              <div class="card-body d-flex flex-column align-items-start">
                                <strong class="d-inline-block mb-2 text-primary">World</strong>
                                <h3 class="mb-0">
                                  <a class="text-dark" href="#/p/${post.id}">${post.title}</a>
                                </h3>
                                <div class="mb-1 text-muted">Nov 12</div>
                                <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                <a href="#/p/${post.id}">Continue reading</a>
                              </div>
                              <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" style="width: 200px; height: 250px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_168cc535e63%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_168cc535e63%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22130.7%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
                            </div>`
                     )
                     .join("\n ")}
               </div>
           </section>
       `;
    return view;
  },
  after_render: async () => {}
};

export default Home;
