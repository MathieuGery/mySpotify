import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/actions/auth.action";
import Cookies from 'js-cookie'


const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token,
})

function Navbar(props) {
    useEffect(() => {
    }, []);

    console.log(props)
    if (!Cookies.get('access_token') || !props.access_token)
        return <></>
    return (
        <div className="w-screen h-20 bg-black flex items-center justify-between shadow-xl">
            <div className="flex">
                <Link to={"/me"}>
                    <div className="ml-16 text-white text-lg hover:text-gray-300">
                        Profile
                    </div>
                </Link>
                <Link to={"/main"}>
                    <div className="ml-16 text-white text-lg hover:text-gray-300">
                        Browse
                    </div>
                </Link>
                <Link to={"/my-playlist"}>
                    <div className="ml-16 text-white text-lg hover:text-gray-300">
                        Playlist
                    </div>
                </Link>
            </div>
            <div className="w-10 h-10 mr-10">
                <svg onClick={() => {
                    props.logout()
                }} className="text-white hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
