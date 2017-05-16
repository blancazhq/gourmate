import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Meal.action"
import {Link} from "react-router";

class Meal extends React.Component {
  componentDidMount(){
    this.props.getSingleMealData(this.props.params.id);
    if(this.props.signin.signedIn){
      this.props.getMealStatus(this.props.signin.id, this.props.params.id, this.props.signin.token)
    }
  }
  render(){
    let data = this.props.meal.data;
    let status = this.props.meal.status;
    let mealid = this.props.params.id;
    let currentuserid = this.props.signin.id;
    let quantity = this.props.meal.quantity;
    let token = this.props.signin.token;
    let reviewtitle = this.props.meal.reviewTitle;
    let reviewcontent = this.props.meal.reviewContent;
    let imgs = this.props.meal.reviewImgs;

    return (
      <div>
      { status==="not watched" ? <button onClick={()=>this.props.watchSingleMeal(currentuserid, mealid, token)}>watch</button> : (status === "watched" ? <button onClick={()=>this.props.unwatchSingleMeal(currentuserid, mealid, token)}>unwatch</button> : null)}

      { data ?
        <div>
          <h2>{data.title}</h2>
          <p>{data.mealdate.slice(0, data.mealdate.indexOf("T"))}</p>
          <p>{data.mealtime}</p>
          <p>{data.address}</p>
          <p>{data.city}</p>
          <p>{data.state}</p>
          <p>${data.price}/person</p>

          <h5>keywords: </h5>
          {data.keyword.map((keyword)=>
            <span>{keyword.word} </span>
          )}

          <h5>courses: </h5>
          {data.course.map((course)=>
            <div>
              <p>course{course.id}: {course.name}</p>
              <p>{course.type}</p>
              <p>{course.description}</p>
            </div>
          )}

          <p>this meal can have at most {data.peoplelimit} people</p>
          <p>{data.guest ? data.guest.map(guest=>guest.quantity).reduce(((a, b)=>a+b), 0) : 0} spots has been taken</p>
          <p>{data.guest ? data.peoplelimit-data.guest.map(guest=>guest.quantity).reduce(((a, b)=>a+b), 0) : data.peoplelimit} spots remaining</p>
          <p>this meal is hosted by {data.hostname}</p>
          <Link to={"/user/"+data.hostid}><img src={data.profileimg} width="50"/></Link>
          <br/>
          {data.mealimg.map((url)=>
            <img src={url} height="300px"/>
          )}<br/>

          <input type="number" onChange={this.props.quantityChange} value={this.props.meal.quantity} max={data.guest ? data.peoplelimit-data.guest.map(guest=>guest.quantity).reduce(((a, b)=>a+b), 0) : data.peoplelimit}/><label> people are going</label>
          {this.props.signin.signedIn ? <button onClick={()=>  this.props.requestMeal(mealid, currentuserid, quantity, token)}>join this meal</button> : <Link to="/signin"><button>join this meal</button></Link>}

          <p>People who are going: </p>
          {data.guest.map((guest)=>
            <p><Link to={"/user/"+guest.user_id}>{guest.name}</Link>&#39;s party of {guest.quantity}</p>
          )}

          {this.props.meal.peopleWantToJoin>0 ? <p>your party of {this.props.meal.peopleWantToJoin} is ready to go!</p> :null}

          <h3>reviews</h3>
          {data.review.map((review)=>
            <div>
              <h5>{review.title}</h5>
              <Link to={"/user/"+review.reviewerid}><p>{review.reviewername}</p></Link>
              <p>{review.content}</p>
              {review.img.map((url)=><img src={url} height="150px"/>)}
            </div>
          )}
          {this.props.signin.signedIn ? <button onClick={this.props.toggleReview}>Were in this meal? Write a review</button> : <Link to="/signin"><button>Were in this meal? Write a review</button></Link>}

          {this.props.meal.reviewing ?
            <div>
            <label>Title</label>
            <input value={this.props.meal.reviewTitle} onChange={this.props.reviewTitleChange}/>
            <label>Content</label>
            <textarea value={this.props.meal.reviewContent} onChange={this.props.reviewContentChange} rows="4" cols="50"/>
            <button onClick={this.props.uploadReviewPicture}>upload pictures</button>
            <button onClick={()=>this.props.submitReview(reviewtitle, reviewcontent, currentuserid, mealid, imgs, token)}>submit review</button>
          </div> : null}

          {this.props.meal.reviewed ? <p>You have already reviewed this meal.</p>: null}
        </div>
        : null
      }
      </div>
    )
  }
}


const MealContainer = ReactRedux.connect(state=>state, actions)(Meal)

export default MealContainer;
