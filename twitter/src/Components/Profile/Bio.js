import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";
import Widgets from "../Widgets/Widgets";
import { Redirect } from "react-router-dom";

class Bio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  changeBio = () => {
    var role = new FormData();
    role.append("email", localStorage.getItem("email"));
    role.append("bio", document.getElementById("newBio").value);
    const option = {
      method: "POST",
      body: role,
    };
    fetch(
      "https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/bio",
      option
    )
      .then((response) => response.text())
      .then((result) => {
        this.setState({ redirect: true });
      })
      .catch((err) => console.error(err));
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/homepage" />;
    } else {
      return (
        <div className="edit">
          <Sidebar />

          <div id="Bio">
            <p>Change your  profile</p>
            <input
              type="text"
              id="newBio"
              placeholder="write the new bio"
            ></input>
            <input
              type="button"
              onClick={this.changeBio}
              placeholder='Update the about me text section'
              value="Update the about me text section"
            ></input>
          </div>
          <Widgets />
        </div>
      );
    }
  }
}

export default Bio;
