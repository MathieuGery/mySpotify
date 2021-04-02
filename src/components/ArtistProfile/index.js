import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import getArtistProfile from "../../redux/services/artist.service";

const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = state => ({
    access_token: state.authReducer.access_token,
    userReducer: state.userReducer
})

function ArtistProfile(props) {
    const [value, setValue] = useState(0);
    useEffect(() => {

        async function anyNameFunction() {
            setValue(await getArtistProfile(props.access_token, props.match.params.id));
            console.log(value)
        }    // Execute the created function directly
        anyNameFunction();
        console.log(value)
    }, []);
    return (
        <div> {JSON.stringify(value)} </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfile);
