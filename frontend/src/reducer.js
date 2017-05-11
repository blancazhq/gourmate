import AppLayoutReducer from "./AppLayout/AppLayout.reducer";
import HomepageReducer from "./Homepage/Homepage.reducer";
import UserReducer from "./User/User.reducer";
import MealReducer from "./Meal/Meal.reducer";
import * as Redux from "redux";

const reducer = Redux.combineReducers({
  applayout: AppLayoutReducer,
  homepage: HomepageReducer,
  user: UserReducer,
  meal: MealReducer
})

export default reducer;
