import React from 'react';
import {connect} from 'react-redux';
import {setToken} from '../../redux/actions/auth.action'

const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(setToken(token))
})

const mapStateToProps = state => ({
    ...state
})

function App(props) {
    return (
        <div className="App">
            <button onClick={() => props.setToken("abduuykeur2")}>Test redux action</button>
            <pre>
                {JSON.stringify(props)}
            </pre>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);