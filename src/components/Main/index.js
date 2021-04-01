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

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor" aria-hidden="true">
                        <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"/>
                    </svg>
                    </div>
                    <input type="text"
                           value={searchValue}
                           className="h-14 w-96 pr-8 pl-10 rounded z-0 focus:shadow focus:outline-none"
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
