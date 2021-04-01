import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getUser, getUserFavoriteTracks, getPlaylists} from "../../redux/actions/user.action";
import {getPlayingTrack} from "../../redux/actions/playing.actions";
import {millisToMinutesAndSeconds} from "../../helpers/millisToMinutesAndSeconds";

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
    playing: state.playingReducer
})

function Player(props) {
    useEffect(() => {
    }, []);

    function computeWidthProgress() {
        return Math.ceil(props.playing?.progress_ms*100/props.playing?.playing_track?.duration_ms) + "%";
    }

    const buildPlayer = () => {
        if (props.playing.error) {
            return (
                <div className="w-full mt-56 flex justify-center items-center">
                    <div className="text-black text-center text-2xl">
                        {JSON.stringify(props.playing.error)}. Try to reconnect to the app
                    </div>
                </div>
            )
        } else if (props.playing.playing_track)
            return (
                <div className="w-full h-full flex flex-col items-center justify-evenly">
                    <div className="flex w-full items-center justify-evenly">
                        <div className="w-1/4">
                            <img src={props.playing?.playing_track?.album?.images[0]?.url} alt={"album photo"}/>
                        </div>
                        <div className="w-2/4 h-full flex flex-col justify-center">
                            <p key={props?.playing?.playing_track.name + '-player'}
                               className="text-lg font-semibold text-black truncate">{props.playing?.playing_track?.name}</p>
                            <p className="mt-2 flex items-center text-lg text-gray-500">
                                {
                                    props.playing?.playing_track?.artists?.map((artist, index) => {
                                        return (
                                            <>
                                        <span key={`artist-${props.playing?.playing_track?.id}-${index}`}
                                              className="truncate">{artist?.name}</span>
                                                {index !== props.playing?.playing_track?.artists.length - 1 &&
                                                <span>,&nbsp;</span>}
                                            </>
                                        )
                                    })
                                }
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-1/4 flex flex-col items-center justify-evenly">
                        <div className="w-1/3 h-full flex justify-evenly items-center">
                            <div className="text-grey-darker">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"/>
                                </svg>
                            </div>
                            <div className="text-dark p-8 rounded-full bg-red-light shadow-lg">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/>
                                </svg>
                            </div>
                            <div className="text-grey-darker">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="w-2/3 mt-5 h-full">
                            <div className="flex justify-between text-sm text-grey-darker">
                                <p>{millisToMinutesAndSeconds(props.playing?.progress_ms)}</p>
                                <p>{millisToMinutesAndSeconds(props.playing?.playing_track?.duration_ms)}</p>
                            </div>
                            <div className="mt-1">
                                <div className="h-1 bg-gray-300 rounded-full">
                                    <div style={{width: computeWidthProgress()}} className="w-1/5 h-1 bg-primary rounded-full relative">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        else
            return (<></>)
    }

    return (
        buildPlayer()
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
