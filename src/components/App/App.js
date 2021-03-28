import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Cookies from 'js-cookie'

import Auth from "../Auth";
import Main from "../Main";
import Navbar from "../Navbar";
import Profile from "../Profile";
import Playlist from "../Playlist";
import {connect} from "react-redux";
import {logout} from "../../redux/actions/auth.action";

const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token
})

function App(props) {
    useEffect(() => {
    }, [])

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
            <div className="bg-primary w-screen h-screen">
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Auth}/>
                    <Route exact path="/login" component={Auth}/>
                    <PrivateRoute exact path="/main" component={Main}/>
                    <PrivateRoute exact path="/me" component={Profile}/>
                    <PrivateRoute exact path="/my-playlist" component={Playlist}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
