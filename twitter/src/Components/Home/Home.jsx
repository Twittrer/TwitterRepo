import React from 'react';
import './Home.css'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    render() {
        return (
            <div className="container">
                <div className="left">
                  
                    <ul>
                        <li className='follow'>
                            Follow your interests.
                        </li>
                        <li className='fas fa-users-friends icon'>
                            Hear what people are talking about.
                        </li>
                        <li className='join'>
                            Join the conversation.
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <div className='card'>
                        <div className='image'>
                            <img src="https://www.lter-europe.net/document-archive/image-gallery/albums/logos/TwitterLogo_55acee.png/image" alt="Bird" width="70px" height="70px" />
                        </div>
                        <h1>See what’s happening in</h1>
                        <h1 style={{marginLeft:"-50px"}}>the world right now</h1>
                        <h4 style={{marginLeft:"-260px"}}>Join Twitter today.</h4>
                        <button className="btn">Sign Up</button>
                        <button className="btn1">Log in</button>
                    </div>
                </div>
                <div className="bottom">
                    <ul>
                        <li>
                            <a href='#'>About</a>
                        </li>
                        <li>
                            <a href='#'>Help Center</a>
                        </li>
                        <li>
                            <a href='#'>
                                Terms of Service</a>
                        </li>
                        <li>
                            <a href='#'> Privacy Policy</a>
                        </li>
                        <li>
                            <a href='#'>Cookie Policy</a>
                        </li>
                        <li>
                            <a href='#'>
                                Ads info</a>
                        </li>
                        <li>
                            <a href='#'>  Blog</a>
                        </li>
                        <li>
                            <a href='#'> Status</a>
                        </li>
                        <li>
                            <a href='#'> Careers</a>
                        </li>
                        <li>
                            <a href='#'>Brand Resources</a>
                        </li>
                        <li>
                            <a href='#'> Advertising</a>
                        </li>
                        <li>
                            <a href='#'>Marketing</a>
                        </li>
                        <li>
                            <a href='#'>Twitter for Business</a>
                        </li>
                        <li>
                            <a href='#'>Developers</a>
                        </li>
                        <li>
                            <a href='#'>Directory</a>
                        </li>
                        <li>
                            <a href='#'>Settings</a>
                        </li>
                        <li>
                            © 2021 Twitter, Inc.
                        </li>

                    </ul>

                </div>

            </div>
        );
    }
}


export default Home