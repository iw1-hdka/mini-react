let Register = {
  render: async () => {
    return /*html*/ `
            <section class="section">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" id="register_submit_btn" class="btn btn-primary">Submit</button>
              </form>
            </section>
        `;
  },
  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  after_render: async () => {
    document
      .getElementById("register_submit_btn")
      .addEventListener("click", () => {
        let email = document.getElementById("email_input");
        let pass = document.getElementById("pass_input");
        let repeatPass = document.getElementById("repeat_pass_input");
        if (pass.value != repeatPass.value) {
          alert(`The passwords dont match`);
        } else if (
          (email.value == "") |
          (pass.value == "") |
          (repeatPass == "")
        ) {
          alert(`The fields cannot be empty`);
        } else {
          alert(`User with email ${email.value} was successfully submitted!`);
        }
      });
  }
};

export default Register;
