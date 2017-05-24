import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./CreateMeal.actions"

class CreateMeal extends React.Component{
  componentWillMount(){
    this.props.initCreateMeal();
  }

  render(){
    let data = {
      id: this.props.signin.id,
      token: this.props.signin.token,
      introtitle: this.props.createmeal.introtitle,
      introcontent: this.props.createmeal.introcontent,
      mealdate: this.props.createmeal.mealdate,
      mealtime: this.props.createmeal.mealtime,
      address: this.props.createmeal.address,
      city: this.props.createmeal.city,
      state: this.props.createmeal.state,
      price: this.props.createmeal.price,
      peoplelimit: this.props.createmeal.peoplelimit,
      keyword: this.props.createmeal.keyword,
      course: this.props.createmeal.course,
      img: this.props.createmeal.img
    }
    let error = this.props.createmeal.error;


    return (
      <div>
      {!this.props.createmeal.createdmeal ? <div id="create_meal_wrapper">
          <h2>create a meal</h2>
          <label>introduction title <span>(required)</span></label><input className={error==="title cannot be empty" ? "create_meal_invalid" :null} type="text" value={data.introtitle} onChange={this.props.introtitleChange}/>
          <label>introduction content <span>(required)</span></label><input className={error==="content cannot be empty" ? "create_meal_invalid" :null} type="text" value={data.introcontent} onChange={this.props.introcontentChange}/>
          <label>date <span>(required YYYY-MM-YY)</span></label><input className={error==="date invalid" ? "create_meal_invalid" :null} type="text" value={data.mealdate} onChange={this.props.mealdateChange}/>
          <label>time <span>(required HH:MM)</span></label><input className={error==="time invalid" ? "create_meal_invalid" :null} type="text" value={data.mealtime} onChange={this.props.mealtimeChange}/>
          <label>place <span>(required)</span></label><input className={error==="address cannot be empty" ? "create_meal_invalid" :null} id="create_meal_address" type="text" value={data.address} onChange={this.props.addressChange} placeholder="stree address"/>
          <input className={error==="city cannot be empty" ? "create_meal_invalid" :null} type="text" id="create_meal_city" value={data.city} onChange={this.props.cityChange} placeholder="city"/>
          <input type="text" className={error==="state invalid" ? "create_meal_invalid" :null} id="create_meal_state" value={data.state} onChange={this.props.stateChange} placeholder="state"/>
          <label>price</label><input type="number" value={data.price} onChange={this.props.priceChange}/>
          <label>at most how many people can come?</label><input type="number" value={data.peoplelimit} onChange={this.props.peoplelimitChange}/>

          <label>keywords <span>(required at least 3)</span> </label>
          <div className="cf">
          {data.keyword.map((keyword, idx)=>
              <input className={idx%3===0 ?
                (error==="you haven't enter enough keywords, 3 required"
                ?"create_meal_input create_meal_input_clear create_meal_invalid"
                : "create_meal_input create_meal_input_clear")
                :(error==="you haven't enter enough keywords, 3 required"
                ?"create_meal_input create_meal_invalid"
                :"create_meal_input")} type="text" value={keyword} placeholder={"keyword"+(idx+1)} onChange={(event)=>this.props.keywordChange(event, idx)}/>
          )}
          </div>

          <button onClick={this.props.addKeyword}>add a keyword</button>

          {data.course.map((course, idx)=>
            <div>
            <h4>course {idx+1}: </h4>
            <label>name <span>(required)</span></label>
            <input className={error==="you haven't enter enough courses, 1 required" ? "create_meal_invalid" :null} type="text" value={course.name} onChange={(event)=>this.props.coursenameChange(event, idx)}/>
            <label>description</label>
            <input type="text" value={course.description} onChange={(event)=>this.props.coursedescriptionChange(event, idx)}/>
            <label>type</label>
            <input type="text" value={course.type} onChange={(event)=>this.props.coursetypeChange(event, idx)}/>
            </div>
          )}

          <button onClick={this.props.addCourse}>add a course</button>

          <button onClick={this.props.mealimguploadChange}>upload meal images</button>

          {data.img ? data.img.map((img)=><img src={img} height="50px"/>) : null}

          <p id="create_meal_error">{this.props.createmeal.error}</p>

          <button id="create_meal_button" onClick={()=>this.props.createMeal(data)}>create meal</button>

      </div> :
      <div id="create_meal_complete">
        <p>Thank you for creating this meal</p>
        <button onClick={this.props.toggleCreateMeal}>create another meal</button>
      </div>}
      </div>
    )
  }
}

const CreateMealContainer = ReactRedux.connect(state=>state, actions)(CreateMeal)

export default CreateMealContainer
