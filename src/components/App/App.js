import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changePage} from "./redux/actions";
import {MainPage, ForecastPage} from '../../pages';
import {Route, Link} from "react-router-dom";
import * as R from "ramda";

class App extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount(){
        this.props.history.push('/main');
    }

    render() {
        return (
            <div className={`the-app`}>
                <Route
                    exact path="/main"
                    render={props => (
                        <MainPage
                            {...props}
                        />
                    )}
                />
                <Route
                    exact path="/forecast"
                    render={props => (
                        <ForecastPage
                            {...props}
                        />
                    )}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const AppState = state.App;
    return {
        currentPage: AppState.currentPage
    };
};

const mapDispatchers = (dispatch, props) => {
    return bindActionCreators({
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchers)(App);