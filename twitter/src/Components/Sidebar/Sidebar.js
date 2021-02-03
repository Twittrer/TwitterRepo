import React, { Component } from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { details, tweets } from "../../redux/actions";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     
    };
  }
  signout = () => {
    localStorage.removeItem("email");
    this.setState({});
  };

  render() {
    if (!localStorage.getItem("email")) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="sidebar">
          <TwitterIcon className="sidebar__twitterIcon" />
          <NavLink className="link" to="/homepage">
            {" "}
            <SidebarOption id="nav" Icon={HomeIcon} text="Home" />{" "}
          </NavLink>

          <NavLink className="link" to="/explore">
            {" "}
            <SidebarOption Icon={SearchIcon} text="Explore" />
          </NavLink>
          <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
          <SidebarOption Icon={MailOutlineIcon} text="Messages" />
          <NavLink className="link" to="/bookmarks">
            {" "}
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
          </NavLink>
          <SidebarOption Icon={ListAltIcon} text="Lists" />
          <NavLink
            className="link"
            to="/profile"
          >
            {" "}
            <SidebarOption Icon={PermIdentityIcon} text="Profile" />{" "}
          </NavLink>

          <SidebarOption Icon={MoreHorizIcon} text="More" />
          <Button
            variant="outlined"
            className="sidebar__tweet"
            onClick={this.signout}
          >
            Sign Out
          </Button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
