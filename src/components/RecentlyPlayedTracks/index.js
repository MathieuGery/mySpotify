import React from 'react';
import {connect} from "react-redux";
import {getRecentlyPlayedTracks} from "../../redux/actions/user.action";

const mapDispatchToProps = dispatch => ({
    getRecentlyPlayedTracks: (access_token) => dispatch(getRecentlyPlayedTracks(access_token)),
})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token,
    userReducer: state.userReducer
})

function RecentlyPlayedTracks(props) {
    function buildRecentlyPlayedTracksSection() {
        return props.userReducer?.recently_played_tracks?.items?.map((data, index) => {
            return (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full"
                                     src={data.track.album.images[2].url}
                                     alt=""/>
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    {data.track.name}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{data.track.album.artists[0].name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span
                            className="text-sm text-gray-900">
                          {data.track.album.name}
                        </span>
                    </td>
                </tr>
            )
        })
    }

    function buildRecentlyPlayedTracks() {
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
                <div className="mx-10 pt-20 flex flex-col">
                    <div className="pt-5 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Artist
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Album
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y">
                                    {buildRecentlyPlayedTracksSection()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            )
    }

    return (
        buildRecentlyPlayedTracks()
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayedTracks);
