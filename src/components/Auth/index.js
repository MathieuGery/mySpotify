import React, {useEffect} from 'react';
import {connect} from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { userService } from "../../redux/services/auth.services";

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(login())
})

const mapStateToProps = state => ({
    ...state
})

function Auth(props) {
    useEffect(() => {
    }, []);

    return (
        <div>
            <button onClick={() => {
                props.login();
                window.location = userService.login() //to open new page
            }}>Login</button>
            <pre>
                {JSON.stringify(props)}
            </pre>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
