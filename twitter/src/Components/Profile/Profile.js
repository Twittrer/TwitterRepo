import React, { Component } from "react";
import "./Profile.css";
import Post from "../Feed/Post";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { details, tweets } from "../../redux/actions";


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
        this.setState({ user: result.data });
      })
      .catch((err) => console.error(err));




    var follow = false;
    if (this.props.details2?.following) {
      for (var i = 0; i < this.state.user?.following.length; i++) {
        if (this.this.state.user?.following[i]["_id"] === this.props.details2["_id"]) {
          this.follow = true;
        }
      }
    }
    this.setState({ follow });
  }


  do = (x, y) => {
    var role = new FormData();
    role.append("email", localStorage.getItem("email"));
    role.append("username", this.props.details2.username);
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


  render() {
    return (
      // --------------------------------header------------------------------------//
      <div className="profile">
        <div className="profile__header">
          <h2> {this.props.details2?.username}</h2>
          <h5> {this.props.tweets2?.length} Tweets </h5>
        </div>
        <div>
          {/* ---------------------profile box-----------------------*/}
          <div className="profile__info">
            <form>
              <Link to="/cover">
                <img
                  className="img"
                  src={this.props.details2?.cover}
                  alt="cover"
                  onClick={this.cover}
                  id='cover'
                />
              </Link>
              <Link to="/avatar">
                <img
                  className="profile__img"
                  src={this.props.details2?.avatar}
                  alt="avatar"
                  onClick={this.avatar}
                  id='avatar'
                />
              </Link>



              <h5 className="username"> @{this.props.details2?.username}</h5>

              <h3 className="bio"> {this.props.details2?.bio}

                {this.props.details2?.email === this.state.user?.email ?
                  <Link to="/bio" style={{ textDecoration: 'none' }}><Button className='profile__followButton' > Edit text </Button></Link>

                  : this.state.follow ? (
                    <div
                      style={{ color: "#df5986" }}
                      className="pinkicon"
                      onClick={() => {
                        this.do("unfollow", "follow");
                      }}
                    >
                      <Button className='profile__followButton'>unFollow</Button>
                    </div>
                  ) : (
                      <div
                        className="pinkicon"
                        onClick={() => {
                          this.do("follow", "follow");
                        }}
                      >
                        <Button className='profile__followButton'>Follow</Button>
                      </div>
                    )}
              </h3>

              <h3 className="followers">
                {" "}
                <span className="number">
                  {this.props.details2?.following.length}
                </span>{" "}
                Following{" "}
              </h3>{" "}
              <h3 className="followers" id="h3">
                {" "}
                <span className="number">
                  
                  { this.state.follow?this.props.details2?.followers.length+1:this.props.details2?.followers.length}
                </span>{" "}
                Followers{" "}
              </h3>
            </form>
          </div>
        </div>
        {/* ------------------------------post--------------------------------*/}
        <div>
          {Array.isArray(this.props.tweets2)
            ? this.props.tweets2.concat(this.props.details2.retweets).map((post, i) => {
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
                  comments={post.comments}
                  likes={post.likes}
                  retweets={post.retweets}
                  date={post.date}
                  time={post.time}
                />
              );
            })
            : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    details2: state.details2,
    tweets2: state.tweets2,
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


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
