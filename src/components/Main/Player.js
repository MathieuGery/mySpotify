import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {millisToMinutesAndSeconds} from "../../helpers/millisToMinutesAndSeconds";
import {pause, play} from "../../redux/actions/playing.actions";
import axios from "axios";

const mapDispatchToProps = dispatch => ({
    pause: (access_token) => dispatch(pause(access_token)),
    play: (access_token) => dispatch(play(access_token))
})

const mapStateToProps = state => ({
    playing: state.playingReducer,
    access_token: state.authReducer.access_token
})

function Player(props) {
    useEffect(() => {
    }, []);

    function computeWidthProgress() {
        return Math.ceil(props.playing?.progress_ms * 100 / props.playing?.playing_track?.duration_ms) + "%";
    }

    const playPreviousTrack = () => {
        return axios.post(
            "https://api.spotify.com/v1/me/player/previous",
            {},
            {
                headers: {'Authorization': `Bearer ${props.access_token}`}
            }
        ).then((res) => {
            console.log(res.data);
            return res.data;
        }).catch((err) => {
            console.log(err.response.data);
            throw err.response.data.error.message;
        })
    }

    const playNextTrack = () => {
        return axios.post(
            "https://api.spotify.com/v1/me/player/next",
            {},
            {
                headers: {'Authorization': `Bearer ${props.access_token}`}
            }
        ).then((res) => {
            console.log(res.data);
            return res.data;
        }).catch((err) => {
            console.log(err.response.data);
            throw err.response.data.error.message;
        })
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
                                <svg onClick={() => playPreviousTrack()} className="w-8 h-8 hover:text-gray-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z"/>
                                </svg>
                            </div>
                            {props.playing?.is_playing &&
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => props.pause(props.access_token)} className="w-24 h-24 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"/>
                            </svg>
                            }
                            {!props.playing?.is_playing &&
                            <svg xmlns="http://www.w3.org/2000/svg"  onClick={() => props.play(props.access_token)} className="w-24 h-24 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                      clipRule="evenodd"/>
                            </svg>
                            }
                            <div className="text-grey-darker">
                                <svg onClick={() => playNextTrack()} className="w-8 h-8 hover:text-gray-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
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
                                    <div style={{width: computeWidthProgress()}}
                                         className="w-1/5 h-1 bg-primary rounded-full relative">
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
