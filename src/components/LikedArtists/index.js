import React from 'react';
import {connect} from "react-redux";
import {getLikedArtists} from "../../redux/actions/user.action";
import {Link} from "react-router-dom";

const mapDispatchToProps = dispatch => ({
    getLikedArtists: (access_token) => dispatch(getLikedArtists(access_token)),
})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token,
    userReducer: state.userReducer
})

function LikedArtists(props) {

    function buildLikedArtistsSection() {
        return props.userReducer?.liked_artists?.artists?.items?.map((data, index) => {
            return (
                <li key={index} className="py-10 px-6 bg-white text-center rounded-lg xl:px-10 xl:text-center">
                    <div className="space-y-6 xl:space-y-10">
                        <img className="mx-auto h-20 w-20 rounded-full shadow-2xl"
                             src={data.images[0].url}
                             alt=""/>
                        <div className="font-medium text-lg leading-6 space-y-1">
                            <h3 className="text-black">{data.name}</h3>
                        </div>
                        <div>
                            <Link to={"/artist/" + data.id}>
                                <div
                                    className="text-white bg-gray-700 hover:text-gray-800 hover:bg-green-500 px-3 py-2 rounded-md text-sm font-medium">
                                    Explore
                                </div>
                            </Link>
                        </div>
                    </div>
                </li>
            )
        })
    }

    function buildLikedArtists() {
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
                        <div className="ml-5 text-center">Your Followed Artists<br/></div>
                    </div>
                    <ul className="m-16 space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
                        {buildLikedArtistsSection()}
                    </ul>
                </div>
            )
    }

    return (
        buildLikedArtists()
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedArtists);
