import React from "react";
import "./Bookmarks.css";
import { Redirect } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widgets";
import { connect } from "react-redux";
import Post from "../Feed/Post";

class Bookmarks extends React.Component {
  render() {
  if (!localStorage.getItem("email")) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="bookmarks">
        <Sidebar />
        <div>
          <div className='bookmark__header'>
            Bookmarks
            </div><div>
            @{this.props.details2.username}
          </div>
          <div>
          {this.props.details2.saves?.length>0?
          this.props.details2.saves.reverse().map((post, i) => {
            return (
              <Post
                key={i}
                id={post._id}
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
          }):<div className='center'><div className="addsome">You haven’t added any Tweets to your Bookmarks yet</div>
                  <div>When you do, they’ll show up here.</div></div>}
          </div>
        </div>
        <Widgets />
      </div>
    );
  }
};}

const mapStateToProps = (state) => {
  return {
    details2: state.details2,
  };
};

export default connect(mapStateToProps)(Bookmarks);
