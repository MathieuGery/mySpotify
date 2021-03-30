import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getPlaylists} from "../../redux/actions/playlists.action";

const mapDispatchToProps = dispatch => ({
    getPlaylists: (access_token) => dispatch(getPlaylists(access_token))
})

const mapStateToProps = state => ({
    playlists: state.playlistsReducer,
    ...state
})

function Playlist(props) {
    useEffect(() => {
        props.getPlaylists(props.authReducer.access_token);
    }, [props.authReducer.access_token])

    return (
        <div>
            {JSON.stringify(props.playlists)}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
