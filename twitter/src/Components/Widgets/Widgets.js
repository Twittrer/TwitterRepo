import React from "react";
import "./Widgets.css";
import SearchIcon from "@material-ui/icons/Search";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed} from 'react-twitter-embed';
import { connect } from "react-redux";
import { details, tweets } from "../../redux/actions";

class Widgets extends React.Component {
  search=()=>{
    visit = (e) => {
      var role = new FormData();
      role.append("username", document.getElementById('search').value);
      const option = {
        method: "POST",
        body: role,
      };
      fetch(
        "https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/user",
        option
      )
        .then((response) => response.json())
        .then((result) => {
          var role2 = new FormData();
          role2.append("email", result.data.email);
          const option2 = {
            method: "POST",
            body: role2,
          };
          fetch(
            "https://cors-anywhere.herokuapp.com/https://twittrer.herokuapp.com/tweet",
            option2
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
  }
render(){
  if (this.state.redirect) {
    return <Redirect to="/profile" />;
  }else{
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" onClick={this.search}/>
        <input id="search" placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <TwitterTweetEmbed
  tweetId={'933354946111705097'}
/>

        <TwitterTimelineEmbed
  sourceType="profile"
  screenName="saurabhnemade"
  options={{height: 400}}
/>
<TwitterShareButton
    url={'https://facebook.com/saurabhnemade'}
    options={{ text: '#reactjs is awesome', via: 'hibatamimi' }}
  />
      </div>
      
      <div className="widgets__widgetContainer">
      
        <TwitterTweetEmbed
  tweetId={'933354946111705097'}
/>

        <TwitterTimelineEmbed
  sourceType="profile"
  screenName="saurabhnemade"
  options={{height: 400}}
/>
<TwitterShareButton
    url={'https://facebook.com/saurabhnemade'}
    options={{ text: '#reactjs is awesome', via: 'hibatamimi' }}
  />
      </div>
    </div>
  );
}}}
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

export default connect(mapStateToProps, mapDispatchToProps)(Widgets);