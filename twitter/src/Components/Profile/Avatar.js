import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";
import Widgets from "../Widgets/Widgets";
import { Redirect } from "react-router-dom";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  changeAvatar = () => {
    var role = new FormData();
    role.append("email", localStorage.getItem("email"));
    role.append("avatar", document.getElementById("newAvatar").value);
    const option = {
      method: "POST",
      body: role,
    };
    fetch(
      "https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/avatar",
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

          <div id="avatar">
          <p>Change your  profile image</p>

            <input
              type="text"
              id="newAvatar"
              placeholder="enter the URL for the new image"
            ></input>
            </div><div>
            <input
              type="button"
              onClick={this.changeAvatar}
              value="Update Avatar Image"
            ></input>
          </div>
          <Widgets />
        </div>
      );
    }
  }
}

export default Avatar;
