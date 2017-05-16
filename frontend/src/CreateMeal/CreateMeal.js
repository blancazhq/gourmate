import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./CreateMeal.actions"

class CreateMeal extends React.Component{
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
    return (
      <div>
      {!this.props.createmeal.createdmeal ? <div>
          <p>sign up</p>
          <label>introtitle</label><input type="text" value={data.introtitle} onChange={this.props.introtitleChange}/><br/>
          <label>introcontent</label><input type="text" value={data.introcontent} onChange={this.props.introcontentChange}/><br/>
          <label>mealdate</label><input type="text" value={data.mealdate} onChange={this.props.mealdateChange}/><br/>
          <label>mealtime</label><input type="text" value={data.mealtime} onChange={this.props.mealtimeChange}/><br/>
          <label>address</label><input type="text" value={data.address} onChange={this.props.addressChange}/><br/>
          <label>city</label><input type="text" value={data.city} onChange={this.props.cityChange}/><br/>
          <label>state</label><input type="text" value={data.state} onChange={this.props.stateChange}/><br/>
          <label>price</label><input type="number" value={data.price} onChange={this.props.priceChange}/><br/>
          <label>at most how many people can come?</label><input type="number" value={data.peoplelimit} onChange={this.props.peoplelimitChange}/><br/>

          <p>keywords: </p>
          {data.keyword.map((keyword, idx)=>
            <input type="text" value={keyword} onChange={(event)=>this.props.keywordChange(event, idx)}/>)}

          <button onClick={this.props.addKeyword}>add a keyword</button>

          {data.course.map((course, idx)=>
            <div>
            <p>course{idx+1}: </p>
            <label>name</label>
            <input type="text" value={course.name} onChange={(event)=>this.props.coursenameChange(event, idx)}/><br/>
            <label>description</label>
            <input type="text" value={course.description} onChange={(event)=>this.props.coursedescriptionChange(event, idx)}/><br/>
            <label>type</label>
            <input type="text" value={course.type} onChange={(event)=>this.props.coursetypeChange(event, idx)}/><br/>
            </div>
          )}

          <button onClick={this.props.addCourse}>add a course</button>

          <button onClick={this.props.mealimguploadChange}>upload meal images</button>

          {data.img ? data.img.map((img)=><img src={img} width="50px"/>) : null}

          <button onClick={()=>this.props.createMeal(data)}>create meal</button>
          <p>{this.props.error}</p>
      </div> : <p>Thank you for creating this meal</p>}
      </div>
    )
  }
}

const CreateMealContainer = ReactRedux.connect(state=>state, actions)(CreateMeal)

export default CreateMealContainer
