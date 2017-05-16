import AppLayoutReducer from "./AppLayout/AppLayout.reducer";
import MealResultReducer from "./MealResult/MealResult.reducer";
import UserReducer from "./User/User.reducer";
import MealReducer from "./Meal/Meal.reducer";
import SignupReducer from "./Signup/Signup.reducer";
import SigninReducer from "./Signin/Signin.reducer";
import DashboardReducer from "./Dashboard/Dashboard.reducer";
import MessageLayoutReducer from "./MessageLayout/MessageLayout.reducer";
import InboxReducer from "./Inbox/Inbox.reducer";
import SentReducer from "./Sent/Sent.reducer";
import NewMessageReducer from "./NewMessage/NewMessage.reducer";
import MeallistLayoutReducer from "./MeallistLayout/MeallistLayout.reducer";
import RequestedMealReducer from "./RequestedMeal/RequestedMeal.reducer";
import WatchedMealReducer from "./WatchedMeal/WatchedMeal.reducer";
import ApprovedMealReducer from "./ApprovedMeal/ApprovedMeal.reducer";
import PurchasedMealReducer from "./PurchasedMeal/PurchasedMeal.reducer";
import BecomeAHostReducer from "./BecomeAHost/BecomeAHost.reducer";
import HostDashboardReducer from "./HostDashboard/HostDashboard.reducer";
import HostedMealReducer from "./HostedMeal/HostedMeal.reducer";
import CreateMealReducer from "./CreateMeal/CreateMeal.reducer";
import ManageRequestReducer from "./ManageRequest/ManageRequest.reducer";
import SearchReducer from "./Search/Search.reducer";

import * as Redux from "redux";

const reducer = Redux.combineReducers({
  applayout: AppLayoutReducer,
  mealresult: MealResultReducer,
  user: UserReducer,
  meal: MealReducer,
  signup: SignupReducer,
  signin: SigninReducer,
  dashboard: DashboardReducer,
  messagelayout: MessageLayoutReducer,
  inbox: InboxReducer,
  sent: SentReducer,
  newmessage: NewMessageReducer,
  meallistlayout: MeallistLayoutReducer,
  requestedmeal: RequestedMealReducer,
  watchedmeal: WatchedMealReducer,
  purchasedmeal: PurchasedMealReducer,
  approvedmeal: ApprovedMealReducer,
  becomeahost: BecomeAHostReducer,
  hostdashboard: HostDashboardReducer,
  hostedmeal: HostedMealReducer,
  createmeal: CreateMealReducer,
  managerequest: ManageRequestReducer,
  search: SearchReducer
})

export default reducer;
