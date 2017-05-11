import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {hashHistory, Router, Route, IndexRoute, Link, IndexLink} from "react-router";
import ReduxThunk from "redux-thunk";
import './index.css';
import reducer from "./reducer";
import AppLayoutContainer from "./AppLayout/AppLayout";
import HomepageContainer from "./Homepage/Homepage";
import MealContainer from "./Meal/Meal";
import UserContainer from "./User/User";

let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), Redux.applyMiddleware(ReduxThunk));

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayoutContainer}>
        <IndexRoute component={HomepageContainer}/>
        <Route path="/meal/:id" component={MealContainer}/>
        <Route path="/user/:id" component={UserContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
