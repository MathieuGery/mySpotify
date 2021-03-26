import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {login} from "../../redux/actions/auth.action";
import {userService} from "../../redux/services/auth.services";
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const mapDispatchToProps = dispatch => ({
    login: (access_token) => dispatch(login(access_token))
})

const mapStateToProps = state => ({
    ...state
})

function Auth(props) {
    const history = useHistory();

    useEffect(() => {
        const hash = window.location.hash.substring(1).split("&").reduce(function (initial, item) {
            if (item) {
                let parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
        if (hash.access_token || Cookies.get('access_token')) {
            console.log(hash.access_token);
            Cookies.set('access_token', hash.access_token);
            props.login(hash.access_token)
            props.history.push("/main")
        }
    }, [history]);

    function buildHref() {
        const body = {
            response_type: 'token',
            client_id: '8119815cdf574efd8125ce289ebd22a1',
            scopes: 'user-read-private user-read-email',
            redirect_uri: 'http://localhost:3000'
        }
        return `https://accounts.spotify.com/authorize?` +
            `client_id=${body.client_id}&redirect_uri=${encodeURIComponent(body.redirect_uri)}` +
            `&scope=${encodeURIComponent(body.scopes)}&response_type=${body.response_type}&show_dialog=true`;
    }

    return (
        <div className="bg-primary w-screen h-screen flex items-center justify-center">
            <div className="bg-white flex flex-col justify-center items-center shadow-lg w-1/3 h-auto pt-20 pb-10">
                <img className="w-2/3" src="spotify-logo.png" alt="Logo spotify"/>

                <div className="pt-10 w-1/3">
                    <button type="button"
                            className="inline-flex items-center w-full px-2.5 py-1.5 border border-transparent text-xs font-medium
                            rounded shadow-sm text-white flex justify-center bg-black hover:bg-gray-500 focus:outline-none focus:ring-2
                            focus:ring-offset-2 focus:ring-white text-lg">
                        <a href={buildHref()}>
                            <div>
                                Login
                            </div>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
