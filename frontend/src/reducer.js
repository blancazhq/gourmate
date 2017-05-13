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
  newmessage: NewMessageReducer
})

export default reducer;
