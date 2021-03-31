import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {login} from "../../redux/actions/auth.action";
import TracksItem from "./TracksItem.";

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token
})

function Main(props) {
    const [foundedMusic, setFoundedMusic] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
    }, []);

    const searchForTracks = async (value) => {
        setSearchValue(value);
        if (!value) {
            setFoundedMusic({})
            return;
        }
        setLoading(true);
        const res = await axios.get(
            'https://api.spotify.com/v1/search',
            {
                headers: {'Authorization': `Bearer ${props.access_token}`},
                params: {
                    q: value,
                    type: 'track',
                    limit: '10'
                }
            }
        ).then((res) => {
            return res.data;
        }).catch((err) => {
            return err.response.data;
        })
        setLoading(false);
        setFoundedMusic(res);
    }

    const buildMain = () => {
        if (loading)
            return (
                <div className="w-screen mt-56 flex justify-center items-center">
                    <div className="text-white text-3xl">
                        Loading...
                    </div>
                </div>
            )
        else if (foundedMusic.error)
            return (
                <div className="w-screen flex justify-center items-center">
                    <div className="text-white text-3xl">
                        {JSON.stringify(foundedMusic.error)}. Try to reconnect to the app
                    </div>
                </div>
            )
        else
            return (
                <div className="w-9/12 h-3/4 mt-16 m-auto flex justify-between">
                    <div className="bg-white flex flex-col shadow-lg w-1/3 h-full">
                        <ul className="divide-y max-h-full overflow-y-scroll divide-gray-200">
                            {
                                foundedMusic?.tracks?.items?.map((item, index) => {
                                    console.log(item)
                                    return (<TracksItem key={"TracksItem" + index} item={item} index={index}/>)
                                })
                            }
                        </ul>
                    </div>
                    <div className="bg-white flex flex-col shadow-lg w-1/2 h-full">

                    </div>
                </div>
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
            {buildMain()}
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
