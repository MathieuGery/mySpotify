import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getUser} from "../../redux/actions/user.action";

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
    user: state.userReducer
})

function Profile(props) {
    useEffect(() => {
    }, []);

    return (
        <div>
            {JSON.stringify(props.user)}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
