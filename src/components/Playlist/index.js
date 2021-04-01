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

    function buildPlaylistsSection() {
        return props.userReducer?.playlists?.items?.map((data, index) => {
            return (
                <li key={index} className="py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-center">
                    <div className="space-y-6 xl:space-y-10">
                        <img className="mx-auto h-20 w-20 rounded-full"
                             src={data.images[0].url}
                             alt=""/>
                        <div className="font-medium text-lg leading-6 space-y-1">
                            <h3 className="text-white">{data.name}</h3>
                        </div>
                    </div>
                </li>
            )
        })
    }

    function buildPlaylist() {
        if (props.userReducer.loading)
            return (
                <div className="w-screen h-screen flex justify-center items-center">
                    <div className="text-white text-3xl">
                        Loading...
                    </div>
                </div>
            )
        else if (props.userReducer.error)
            return (
                <div className="w-screen h-screen flex justify-center items-center">
                    <div className="text-white text-3xl">
                        {props.userReducer.error}. Try to reconnect to the app
                    </div>
                </div>
            )
        else
            return (
                <div className="pt-20 flex flex-col items-center">
                    <div className="pt-5 text-white text-3xl flex items-center">
                        <div className="ml-5 text-center">Your Playlists<br/></div>
                    </div>
                    <ul className="m-16 space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
                        {buildPlaylistsSection()}
                    </ul>
                </div>
            )
    }

    return (
        buildPlaylist()
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
