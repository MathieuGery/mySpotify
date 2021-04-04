import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import getArtistProfile from "../../redux/services/artist.service";

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token,
    userReducer: state.userReducer
})

function ArtistProfile(props) {
    const [value, setValue] = useState(0);
    useEffect(() => {

        async function anyNameFunction() {
            setValue(await getArtistProfile(props.access_token, props.match.params.id));
        }    // Execute the created function directly
        anyNameFunction();
    }, []);

    if (!value) {
        return (
            <div> bite </div>
        )
    }

    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto bg-gray-800 lg:bg-transparent lg:px-8 py-10">
                <div className="lg:grid lg:grid-cols-12">
                    <div
                        className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
                        <div className="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden" aria-hidden="true"/>
                        <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
                            <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                                <img className="object-cover object-center rounded-3xl shadow-2xl"
                                     src={value.images[0].url}
                                     alt=""/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="relative bg-white lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
                        <div className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block"
                             aria-hidden="true">
                            <svg
                                className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
                                width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
                                <defs>
                                    <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20"
                                             height="20" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="4" height="4" className="text-green-500"
                                              fill="currentColor"/>
                                    </pattern>
                                </defs>
                                <rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"/>
                            </svg>
                            <svg
                                className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
                                width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
                                <defs>
                                    <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20"
                                             height="20" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="4" height="4" className="text-green-500"
                                              fill="currentColor"/>
                                    </pattern>
                                </defs>
                                <rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"/>
                            </svg>
                        </div>
                        <div
                            className="relative mx-8 py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
                            <h2 className="text-3xl font-extrabold text-gray-800" id="join-heading">{value.name}</h2>
                            <div className="min-w-0 flex-1 px-5">
                                <p className="text-sm font-medium text-gray-900">
                                    Followers
                                </p>
                                <p className="text-sm text-gray-500 pb-2.5 px-2">
                                  {value.followers.total}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    Genres
                                </p>
                                <p className="text-sm text-gray-500 pb-2.5 px-2">
                                    {value.genres}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    Popularity
                                </p>
                                <p className="text-sm text-gray-500 pb-2.5 px-2">
                                    {value.popularity}
                                </p>
                            </div>
                            <a className="bg-white block w-full py-3 px-5 text-center border border-transparent rounded-md shadow-md text-base font-medium text-green-700 hover:text-white hover:bg-green-500 sm:inline-block sm:w-auto"
                               href={value.external_urls.spotify}>Explore on Spotify</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
