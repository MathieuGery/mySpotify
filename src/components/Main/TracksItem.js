import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {setPlayingTrack} from "../../redux/actions/playing.actions";

const mapDispatchToProps = dispatch => ({
    setPlayingTrack: (access_token, playing_track) => dispatch(setPlayingTrack(access_token, playing_track)),
})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token
})

function TracksItem(props) {
    useEffect(() => {
    }, []);

    return (
        <li key={`track-founded-${props.index}`}>
            <button onClick={() => {
                props.setPlayingTrack(props.access_token, props.item?.uri)
            }} className="block hover:bg-gray-50 focus:bg-gray-200">
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-16 w-16"
                                 src={props.item?.album?.images[0]?.url}
                                 alt=""/>
                        </div>
                        <div
                            className="min-w-0 w-2/3 flex-1 px-4">
                            <div className="w-full">
                                <p key={props.item.name + "-" + props.index}
                                   className="text-sm font-semibold text-black truncate">{props.item.name}</p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                    {
                                        props.item?.artists?.map((artist, index) => {
                                            return (
                                                <>
                                                    <span key={`artist-${props.item?.id}-${index}`}
                                                          className="truncate">{artist?.name}</span>
                                                    {index !== props.item?.artists.length - 1 && <span>,&nbsp;</span>}
                                                </>
                                            )
                                        })
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <svg className="h-10 w-10 text-gray-600"
                             xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                        </svg>
                    </div>
                </div>
            </button>
        </li>
    );
}

TracksItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksItem);
