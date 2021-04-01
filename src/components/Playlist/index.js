import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getPlaylists} from "../../redux/actions/user.action";

const mapDispatchToProps = dispatch => ({
    getPlaylists: (access_token) => dispatch(getPlaylists(access_token)),
})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token,
    userReducer: state.userReducer
})

function Playlist(props) {
    useEffect(() => {
    }, []);

    return (
        <div>
            {JSON.stringify(props.userReducer.playlists)}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
