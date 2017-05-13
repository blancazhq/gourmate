import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./User.action"

class User extends React.Component {
  componentDidMount(){
    let id = this.props.params.id || this.props.signin.id;
    this.props.getSingleUserData(id);
  }
  render(){
    let data = this.props.user.data;
    return (
      <div>
      { data ?
        <div>
          <h2>{data.name}</h2>
          <img src={data.imgurl} width="100px"/>
          <h3>{data.intro_title}</h3>
          <p>{data.intro_content}</p>
          <p>{data.food_preference}</p>
          <p>This user has hosted:</p>
          {data.meal.map((meal, idx)=>
            <div key={idx}>
              <img src={meal.url} width="300px"/>
              <h2>{meal.title}</h2>
              <p>{meal.mealdate.slice(0, meal.mealdate.indexOf("T"))}</p>
            </div>)}
        </div>
        : null
      }
      </div>
    )
  }
}


const UserContainer = ReactRedux.connect(state=>state, actions)(User)

export default UserContainer;
