import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import {hashHistory, Router, Route, IndexRoute, Link, IndexLink} from "react-router";
import ReduxThunk from "redux-thunk";
import {persistStore, autoRehydrate} from 'redux-persist';
import CookieStorage from 'redux-persist-cookie-storage'
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
import MeallistLayoutContainer from "./MeallistLayout/MeallistLayout";
import RequestedMealContainer from "./RequestedMeal/RequestedMeal";
import WatchedMealContainer from "./WatchedMeal/WatchedMeal";
import ApprovedMealContainer from "./ApprovedMeal/ApprovedMeal";
import PurchasedMealContainer from "./PurchasedMeal/PurchasedMeal";
import BecomeAHostContainer from "./BecomeAHost/BecomeAHost";
import HostDashboardContainer from "./HostDashboard/HostDashboard";
import HostedMealContainer from "./HostedMeal/HostedMeal";
import CreateMealContainer from "./CreateMeal/CreateMeal";
import ManageRequestContainer from "./ManageRequest/ManageRequest";
import SearchContainer from "./Search/Search";

let store=Redux.createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.compose(
    Redux.applyMiddleware(ReduxThunk),
    autoRehydrate()
  )
);

persistStore(store)


ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayoutContainer}>
        <IndexRoute component={SearchContainer}/>
        <Route path="/searchresult" component={MealResultContainer}/>
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
          <Route path="/dashboard/meallist" component={MeallistLayoutContainer}>
            <IndexRoute component={RequestedMealContainer}/>
            <Route path="/dashboard/meallist/watchedmeal" component={WatchedMealContainer}/>
            <Route path="/dashboard/meallist/Approvedmeal" component={ApprovedMealContainer}/>
            <Route path="/dashboard/meallist/purchasedmeal" component={PurchasedMealContainer}/>
          </Route>
          <Route path="/dashboard/becomeahost" component={BecomeAHostContainer}/>
          <Route path="/dashboard/hostdashboard" component={HostDashboardContainer}>
            <IndexRoute component={HostedMealContainer}/>
            <Route path="/dashboard/hostdashboard/createmeal" component={CreateMealContainer}/>
            <Route path="/dashboard/hostdashboard/managerequest" component={ManageRequestContainer}/>
          </Route>
        </Route>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
