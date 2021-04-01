import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import TracksItem from "./TracksItem";
import Player from "./Player";
import Cookies from 'js-cookie'

export default function Main(props) {
    const [foundedMusic, setFoundedMusic] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (!searchValue) {
            setFoundedMusic({})
            return;
        }
        setLoading(true);
        axios.get(
            'https://api.spotify.com/v1/search',
            {
                headers: {'Authorization': `Bearer ${Cookies.get('access_token')}`},
                params: {
                    q: searchValue,
                    type: 'track',
                    limit: '10'
                }
            }
        ).then((res) => {
            setLoading(false);
            setFoundedMusic(res.data);
        }).catch((err) => {
            setLoading(false);
            setFoundedMusic(err.response.data);
        })
    }, [searchValue]);

    const searchForTracks = async (value) => {
        setSearchValue(value);
    }

    const buildMain = () => {
        if (loading)
            return (
                <div className="w-full mt-56 flex justify-center items-center">
                    <div className="text-black text-2xl">
                        Loading...
                    </div>
                </div>
            )
        else if (foundedMusic.error)
            return (
                <div className="w-full mt-56 flex justify-center items-center">
                    <div className="text-black text-center text-2xl">
                        {JSON.stringify(foundedMusic.error)}. Try to reconnect to the app
                    </div>
                </div>
            )
        else
            return (
                    <ul className="hide-scrollbar divide-y max-h-full overflow-y-scroll divide-gray-200">
                        {
                            foundedMusic?.tracks?.items?.map((item, index) => {
                                return (<TracksItem key={"TracksItem" + index} item={item} index={index}/>)
                            })
                        }
                    </ul>
            )
    }

    return (
        <div className="pt-44 h-screen">
            <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    <input type="text"
                           value={searchValue}
                           className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
                           placeholder="Search songs..."
                           onChange={(event => searchForTracks(event.target.value))}
                    />
                </div>
            </div>
            <div className="w-full h-4/5 mt-16 m-auto flex justify-evenly">
                {searchValue &&
                <div className="bg-white rounded-md flex flex-col shadow-lg w-1/4 h-full">
                    {buildMain()}
                </div>
                }
                <div className={`bg-white rounded-md flex flex-col shadow-lg h-full ${(searchValue ? "w-2/4" : "w-3/4")}`}>
                    <Player/>
                </div>
            </div>
        </div>
    );
}
