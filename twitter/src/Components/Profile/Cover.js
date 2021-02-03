import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widgets";
import "./Profile.css";
import { Redirect } from "react-router-dom";

class Cover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  changeCover = () => {
    var role = new FormData();
    role.append("email", localStorage.getItem("email"));
    role.append("cover", document.getElementById("newCover").value);
    const option = {
      method: "POST",
      body: role,
    };
    fetch(
      "https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/cover",
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

          <div id="cover">
            <input
              type="text"
              id="newCover"
              placeholder="enter the URL for the new image"
            ></input>
            </div><div>
            <input
              type="button"
              onClick={this.changeCover}
              value="Update Cover Image"
            ></input>
          </div>
          <Widgets />
        </div>
      );
    }
  }
}

export default Cover;
