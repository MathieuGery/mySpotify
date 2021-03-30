import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getUserFavoriteTracks} from "../../redux/actions/user.action";

const mapDispatchToProps = dispatch => ({
    getUserFavoriteTracks: (access_token) => dispatch(getUserFavoriteTracks(access_token)),
})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token,
    userReducer: state.userReducer
})

function Profile(props) {

    function buildFavTrackSection() {
        return props.userReducer?.favorite_tracks?.items?.map((data, index) => {
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

    function buildProfile() {
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
                        <img className="w-24 rounded-full" src={props.userReducer?.user?.images[0]?.url}
                             alt="profile-picture"/>
                        <div className="ml-5 text-center">Welcome<br/> <span
                            className="font-bold text-4xl">{props.userReducer?.user?.display_name}</span></div>
                    </div>
                    <ul className="m-16 space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
                        {buildFavTrackSection()}
                    </ul>
                </div>
            )
    }

    return (
        buildProfile()
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
