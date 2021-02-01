import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { details, tweets } from "../../redux/actions";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      comment: false,
    };
  }

  componentDidMount() {
    var liked = false;
    var retweeted = false;
    var saved = false;
    if (this.props.details2.likes) {
      for (var i = 0; i < this.props.details2.likes.length; i++) {
        if (this.props.details2.likes[i]["_id"] === this.props.id) {
          liked = true;
        }
      }
    }
    if (this.props.details2.retweets) {
      for (i = 0; i < this.props.details2.retweets.length; i++) {
        if (this.props.details2.retweets[i]["_id"] === this.props.id) {
          retweeted = true;
        }
      }
    }
    if (this.props.details2.saves) {
      for (i = 0; i < this.props.details2.saves.length; i++) {
        if (this.props.details2.saves[i]["_id"] === this.props.id) {
          saved = true;
        }
      }
    }
    this.setState({ liked, retweeted, saved });
  }

  visit = (e) => {
    var role = new FormData();
    role.append("email", this.props.email);
    const option = {
      method: "POST",
      body: role,
    };
    fetch(
      "https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/email",
      option
    )
      .then((response) => response.json())
      .then((result) => {
        fetch(
          "https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/tweet",
          option
        )
          .then((response2) => response2.json())
          .then((result2) => {
            this.props.details(result.data);
            this.props.tweets(result2.data.reverse());
            this.setState({ redirect: true });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  };

  do = (x, y) => {
    var role = new FormData();
    role.append("email", localStorage.getItem("email"));
    role.append("id", this.props.id);
    const option = {
      method: "POST",
      body: role,
    };
    fetch(
      `https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/${x}`,
      option
    )
      .then((response) => response.text())
      .then((result) => {
        this.setState({ [y]: !this.state[y] });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  comment = (x) => {
    this.setState({comment:true})
  };

  render() {
    if (this.state.comment) {
      return <Comment id={this.props.id} comments={this.props.comments.reverse()}/>
    } else if (this.state.redirect) {
      return <Redirect to="/profile" />;
    } else {
      return (
        <div className="post">
          <div className="post__avatar">
            <Avatar src={this.props.avatar} />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div
                onClick={this.visit}
                className="post__headerText"
                style={{ cursor: "pointer" }}
              >
                <h3>
                  {this.props.username}  |  {this.props.time}  |  {this.props.date}
                </h3>
              </div>
              <div className="post__headerDescription">
                <p>{this.props.text}</p>
              </div>
            </div>
            <img id="image" src={this.props.img} alt="" height="300px" />
            <div className="post__footer">
              <div className="blueicon" onClick={this.comment}>
                <ChatBubbleOutlineIcon fontSize="small" />{" "}
                {this.props.comments ? this.props.comments.length : 0}
              </div>
              {this.state.retweeted ? (
                <div
                  style={{ color: "#7cdf7c" }}
                  className="greenicon"
                  onClick={() => {
                    this.do("unretweet", "retweeted");
                  }}
                >
                  <RepeatIcon fontSize="small" /> {this.props.retweets + 1}
                </div>
              ) : (
                <div
                  className="greenicon"
                  onClick={() => {
                    this.do("retweet", "retweeted");
                  }}
                >
                  <RepeatIcon fontSize="small" /> {this.props.retweets}
                </div>
              )}
              {this.state.liked ? (
                <div
                  style={{ color: "#df5986" }}
                  className="pinkicon"
                  onClick={() => {
                    this.do("unlike", "liked");
                  }}
                >
                  <FavoriteBorderIcon fontSize="small" /> {this.props.likes + 1}
                </div>
              ) : (
                <div
                  className="pinkicon"
                  onClick={() => {
                    this.do("like", "liked");
                  }}
                >
                  <FavoriteBorderIcon fontSize="small" /> {this.props.likes}
                </div>
              )}
              {this.state.saved ? (
                <div
                  style={{ color: "#3715f7" }}
                  className="blueicon"
                  onClick={() => {
                    this.do("unsave", "saved");
                  }}
                >
                  <PublishIcon fontSize="small" />
                </div>
              ) : (
                <div
                  className="blueicon"
                  onClick={() => {
                    this.do("save", "saved");
                  }}
                >
                  <PublishIcon fontSize="small" />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    details2: state.details2,
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
