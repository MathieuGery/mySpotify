import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getPlaylists} from "../../redux/actions/playlists.action";

const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = state => ({
    playlists: state.playlistsReducer,
})

function Playlist(props) {
    useEffect(() => {
    }, []);

    return (
        <div>
            {JSON.stringify(props.playlists)}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
