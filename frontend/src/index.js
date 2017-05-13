import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {hashHistory, Router, Route, IndexRoute, Link, IndexLink} from "react-router";
import ReduxThunk from "redux-thunk";
import './index.css';
import reducer from "./reducer";
import AppLayoutContainer from "./AppLayout/AppLayout";
import MealResultContainer from "./MealResult/MealResult";
import MealContainer from "./Meal/Meal";
import UserContainer from "./User/User";
import SignupContainer from "./Signup/Signup";
import SigninContainer from "./Signin/Signin";
import DashboardContainer from "./Dashboard/Dashboard";
import MessageLayoutContainer from "./MessageLayout/MessageLayout";
import InboxContainer from "./Inbox/Inbox";
import SentContainer from "./Sent/Sent";
import NewMessageContainer from "./NewMessage/NewMessage";

let store=Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),Redux.applyMiddleware(ReduxThunk));


ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayoutContainer}>
        <IndexRoute component={MealResultContainer}/>
        <Route path="/meal/:id" component={MealContainer}/>
        <Route path="/user/:id" component={UserContainer}/>
        <Route path="/signup" component={SignupContainer}/>
        <Route path="/signin" component={SigninContainer}/>
        <Route path="/dashboard" component={DashboardContainer}>
          <IndexRoute component={UserContainer}/>
          <Route path="/dashboard/message" component={MessageLayoutContainer}>
            <IndexRoute component={InboxContainer}/>
            <Route path="/dashboard/message/sent" component={SentContainer}/>
            <Route path="/dashboard/message/newmessage" component={NewMessageContainer}/>
          </Route>
        </Route>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
