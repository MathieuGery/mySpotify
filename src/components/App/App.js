import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Cookies from 'js-cookie'
import {connect} from "react-redux";

import Auth from "../Auth";
import Main from "../Main";
import Navbar from "../Navbar";
import Profile from "../Profile";
import Playlist from "../Playlist";
import LikedTracks from "../Liked";

import {getLikedTracks, getUser} from "../../redux/actions/user.action";
import {getUserFavoriteTracks} from "../../redux/actions/user.action";
import {getPlaylists} from "../../redux/actions/user.action";
import {getPlayingTrack} from "../../redux/actions/playing.actions";

const mapDispatchToProps = dispatch => ({
    getUser: (access_token) => dispatch(getUser(access_token)),
    getUserFavoriteTracks: (access_token) => dispatch(getUserFavoriteTracks(access_token)),
    getPlaylists: (access_token) => dispatch(getPlaylists(access_token)),
    getPlayingTrack: (access_token) => dispatch(getPlayingTrack(access_token)),
    getLikedTracks: (access_token) => dispatch(getLikedTracks(access_token))
})

const mapStateToProps = state => ({
    logged: state.authReducer.loggedIn,
    access_token: state.authReducer.access_token
})

function App(props) {
    useEffect(() => {
        if (props.logged === false) {
            // if (intervalId !== null)
            //     clearInterval(intervalId);
            return;
        }
        props.getUser(props.access_token);
        props.getUserFavoriteTracks(props.access_token);
        props.getPlaylists(props.access_token);
        props.getLikedTracks(props.access_token);
        window.setInterval(() => props.getPlayingTrack(props.access_token), 1000);
        //props.getPlayingTrack(props.access_token);
    }, [props.logged, props.access_token])

    const PrivateRoute = ({component: Component, ...rest}) => (
        <Route
            {...rest}
            render={(props) => {
                let access_token = Cookies.get('access_token');
                if (!access_token && !props.access_token) {
                    return <Redirect to="/login"/>;
                } else {
                    return (
                        <div>
                            <Component {...props}/>
                        </div>
                    );
                }
            }}
        />
    );

    return (
        <BrowserRouter>
            <div className="">
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Auth}/>
                    <Route exact path="/login" component={Auth}/>
                    <PrivateRoute exact path="/main" component={Main}/>
                    <PrivateRoute exact path="/me" component={Profile}/>
                    <PrivateRoute exact path="/my-playlist" component={Playlist}/>
                    <PrivateRoute exact path="/my-liked-tracks" component={LikedTracks}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
