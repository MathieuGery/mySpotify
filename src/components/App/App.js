import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Cookies from 'js-cookie'

import Auth from "../Auth";
import Main from "../Main";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={(props) => {
            let access_token = Cookies.get('access_token');
            if (!access_token) {
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

function App() {
    useEffect(() => {
    }, [])

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Auth}/>
                    <Route exact path="/login" component={Auth}/>
                    <PrivateRoute exact path="/main" component={Main}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;