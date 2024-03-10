import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      csrf: "",
      email: "",
      password: "",
      error: "",
    };
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  login = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrf,
      },
      credentials: "include",
      body: JSON.stringify({ email: this.state.email, password: this.state.password }),
    })
      .then(this.isResponseOk)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: "Wrong email or password." });
      });
  }

  render() {
    return (
      <div className="container mt-3">
        <h1>React Cookie Auth</h1>
        <br />
        <h2>Login</h2>
        <form onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
            <div>
              {this.state.error &&
                <small className="text-danger">
                  {this.state.error}
                </small>
              }
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default App;