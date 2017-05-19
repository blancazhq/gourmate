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
      <div id="search_result_wrapper" className="cf">
          {data ? data.map((meal, idx)=>
            <div className="search_result_unit" key={idx}>
              <div className="search_result_img_div">
                <img className="search_result_img" src={meal.mealimg}/>
              </div>
              <div className="search_result_content">
                <h2>{meal.title}</h2>
                <p>{meal.content}</p>
                <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
                <p>{meal.mealtime}</p>
                <p>this meal is hosted by {meal.hostname}</p>
                <Link to={"/user/"+meal.hostid}><img src={meal.profileimg} height="40px"/></Link>
              </div>
              <div className="search_result_button_div">
                <Link className="search_result_link" to={"/meal/"+meal.id}><button>see detail</button></Link>
              </div>
            </div>
          ): null}
      </div>
    )
  }
}


const MealResultContainer = ReactRedux.connect(state=>state, actions)(MealResult)

export default MealResultContainer;
