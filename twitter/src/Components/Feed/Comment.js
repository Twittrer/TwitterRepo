import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Comment.css";
import Widgets from "../Widgets/Widgets";
import { Redirect } from "react-router-dom";
import { Avatar } from "@material-ui/core";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  changeComment = () => {
    var role = new FormData();
    role.append("email", localStorage.getItem("email"));
    role.append("comment", document.getElementById("newComment").value);
    role.append("id", this.props.id);
    const option = {
      method: "POST",
      body: role,
    };
    fetch(
      "https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/comment",
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

          <div id="Comment">
            <input
              type="text"
              id="newComment"
              placeholder="enter the URL for the new image"
            ></input>
            <input
              type="button"
              onClick={this.changeComment}
              value="Update Comment Image"
            ></input>
          </div>
          {this.props.comments.map((comment,i)=>{
            return(
              <div 
              key={i} 
              className="comment">
                <div><Avatar src={comment.avatar}/> {comment.username} | {comment.time} | {comment.date}</div>
                <div>{comment.comment}</div>
              </div>
            )
          }
          )}
          <Widgets />
        </div>
      );
    }
  }
}

export default Comment;
