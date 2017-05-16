import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./MealResult.action"
import {Link} from "react-router";

class MealResult extends React.Component {
  componentDidMount(){
    let searchterms = {
      keyword: this.props.search.keyword,
      city: this.props.search.city,
      state: this.props.search.state
    }
    this.props.getMealData(searchterms);
  }
  render(){
    let data = this.props.mealresult.data;
    return(
      <div>
        <div>
          {data ? data.map((meal, idx)=>
            <div key={idx}>
              <img src={meal.mealimg} width="300px"/>
              <h2>{meal.title}</h2>
              <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
              <p>{meal.mealtime}</p>
              <p>this meal is hosted by {meal.hostname}</p>
              <Link to={"/user/"+meal.hostid}><img src={meal.profileimg} width="30"/></Link>
              <br/>
              <Link to={"/meal/"+meal.id}><button>see detail</button></Link>
            </div>
          ): null}
        </div>
      </div>
    )
  }
}


const MealResultContainer = ReactRedux.connect(state=>state, actions)(MealResult)

export default MealResultContainer;
