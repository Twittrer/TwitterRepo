import React from "react";
import Post from "./Post";
import "./Feed.css";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { details, tweets } from "../../redux/actions";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      username: "",
      post: "",
      img: "",
      user: "",
    };
  }

  componentDidMount() {
    var role = new FormData();
    role.append("email", localStorage.getItem("email"));
    const option = {
      method: "POST",
      body: role,
    };
    fetch("https://twittrer.herokuapp.com/email", option)
      .then((response) => response.json())
      .then((result) => {
        this.props.details(result.data);
        this.setState({ user: result.data });
      })
      .catch((err) => console.error(err));

    fetch("https://twittrer.herokuapp.com/tweets")
      .then((response) => response.json())
      .then((result) => {
        this.setState({ tweets: result.data.reverse() });
      })
      .catch((err) => {
        console.error(err);
      });
      fetch("https://twittrer.herokuapp.com/tweet", option)
      .then((response) => response.json())
      .then((result) => {
        this.props.tweets(result.data.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }

  sendTweet = (e) => {
    e.preventDefault();
    var role = new FormData();
    role.append("email", localStorage.getItem("email"));
    role.append("tweet", document.getElementById("tweet").value);
    role.append("img", document.getElementById("image").value);
    var option = {
      method: "POST",
      body: role,
    };
    fetch("https://twittrer.herokuapp.com/tweets", option)
      .then((response) => response.text())
      .then((result) => {
        this.componentDidMount();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render() {
    return (
      <div className="feed">
        <div className="feed__header">
          <h2>Home</h2>
        </div>

        <div className="tweetBox">
          <form>
            <div className="tweetBox__input">
              <Link to="/profile" onClick={this.visit}>
                <Avatar src={this.state.user.avatar} />
              </Link>
              <input id="tweet" placeholder="What's happining?" type="text" />
            </div>
            <input
              id="image"
              className="tweetBox__imageInput"
              placeholder="Enter image URL"
              type="text"
            />

            <Button
              onClick={this.sendTweet}
              type="submit"
              className="tweet__tweetButton"
            >
              {" "}
              Tweet{" "}
            </Button>
          </form>
        </div>
        <div>
          {this.state.tweets.map((post, i) => {
            return (
              <Post
                key={i}
                id={post._id}
                post={post}
                username={post.username}
                email={post.email}
                text={post.tweet}
                avatar={post.avatar}
                img={post.img}
                likes={post.likes}
                comments={post.comments}
                retweets={post.retweets}
                date={post.date}
                time={post.time}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    details: (x) => {
      dispatch(details(x));
    },
    tweets: (x) => {
      dispatch(tweets(x));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
