import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Meal.action"
import {Link} from "react-router";


class Meal extends React.Component {
  componentDidMount(){
    this.props.getSingleMealData(this.props.params.id);
    setTimeout(()=>{
      if(this.props.signin.signedIn){
        this.props.getMealStatus(this.props.signin.id, this.props.params.id, this.props.signin.token)
      }
    }, 500)
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
    let reviewstar = this.props.meal.reviewStar;
    let imgs = this.props.meal.reviewImgs;

    return (
      <div>

      { data ?
        <div id="meal_wrapper" className="cf">

          <div id="meal_main_img_div">
            <img src={data.mealimg[0]}/>
          </div>
          <div id="meal_info_div">
            <h2>{data.title}</h2>
            { status==="not watched" && currentuserid !==data.hostid ? <button onClick={()=>this.props.watchSingleMeal(currentuserid, mealid, token)}>watch</button> : (status === "watched" ? <button onClick={()=>this.props.unwatchSingleMeal(currentuserid, mealid, token)}>unwatch</button> : null)}
            <h4>keywords: {data.keyword.map((keyword)=>
              <span>{keyword.word} </span>
            )}</h4>
            <p>{data.mealdate.slice(0, data.mealdate.indexOf("T"))} {data.mealtime}</p>
            <p>{data.address}, {data.city}, {data.state}</p>
            <p>${data.price}/person</p>
            <p>this meal can have at most {data.peoplelimit} people</p>
            <p>{data.guest ? data.peoplelimit-data.guest.map(guest=>guest.quantity).reduce(((a, b)=>a+b), 0) : data.peoplelimit} spots remaining</p>
            <p>this meal is hosted by {data.hostname}</p>
            <Link to={"/user/"+data.hostid}><img src={data.profileimg} height="50px"/></Link>
          </div>

          <div id="meal_course_div">
          <h4>menu: </h4>
          {data.course.map((course, idx)=>
            <div>
              <p>{idx+1}: {course.name}</p>
              <p>{course.type}</p>
              <p>{course.description}</p>
            </div>
          )}
          </div>


          <div id="meal_other_img_div">
          {data.mealimg.map((url, idx)=> {
            if(idx!==0){
              return <img src={url}/>
            }
          })}
          </div>

          <div id="meal_join_info_div">
            {(status === "not watched" || status === "watched") && currentuserid !== data.hostid ? <div id="meal_join_div">
              <div id="meal_join_content_div">
                <h4>Interested? Join this meal</h4>
                <label>guest number: </label><input id="join_meal_number" type="number" onChange={this.props.quantityChange} value={this.props.meal.quantity} max={data.guest ? data.peoplelimit-data.guest.map(guest=>guest.quantity).reduce(((a, b)=>a+b), 0) : data.peoplelimit}/>
                {this.props.meal.peopleWantToJoin>0 ? <p>your party of {this.props.meal.peopleWantToJoin} is ready to go!</p> :null}
              </div>
              {this.props.signin.signedIn ? <button onClick={()=>  this.props.requestMeal(mealid, currentuserid, quantity, token)}>join this meal</button> : <Link to="/signin"><button>join this meal</button></Link>}
            </div> : (currentuserid ===data.hostid ? <div id="meal_join_div"><p>You are the host of this meal</p></div> : <div id="meal_join_div"><p>You already {status} this meal.</p></div>)}

            {data.guest.length>0 ? <div id="meal_people_going_div">
            <p>People who are also going: </p>
            {data.guest.map((guest)=>
              <p><Link to={"/user/"+guest.user_id}>{guest.name}</Link>&#39;s party of {guest.quantity}</p>
            )}
            </div> : null}
          </div>

          <div id="meal_review_div">
          <h3>reviews</h3>
          {data.review.map((review)=>
            <div>
              <h4>{review.title}</h4>
              <div className={"meal_review_display_star star"+review.star}></div>
              <Link to={"/user/"+review.reviewerid}><p>{review.reviewername}</p></Link>
              <p>{review.content}</p>
              {review.img.map((url)=><img className="meal_review_img" src={url}/>)}
            </div>
          )}
          {this.props.signin.signedIn ? <button onClick={this.props.toggleReview} disabled={this.props.meal.reviewed}>{this.props.meal.reviewed ?"You have already reviewed this meal.":"write a review"}</button> : <Link to="/signin"><button>write a review</button></Link>}

          {this.props.meal.reviewing ?
            <div id="meal_writereview_div">
            <div id="meal_writereview_content_div">
              <p>Title</p>
              <input value={this.props.meal.reviewTitle} onChange={this.props.reviewTitleChange}/>
              <p>Content</p>
              <input value={this.props.meal.reviewContent} onChange={this.props.reviewContentChange}/>
            </div>
            <div id="meal_writereview_botton_div">
              <div id="meal_review_star" className={"star"+this.props.meal.reviewStar} onClick={this.props.reviewStarChange}></div>
              <div id="meal_writereview_img_div">
                {imgs ? imgs.map((img)=><img src={img}/>) : null}
              </div>
              <button onClick={this.props.uploadReviewPicture}>upload pictures</button>
              <button id="meal_submit_review_button" onClick={()=>this.props.submitReview(reviewtitle, reviewcontent, currentuserid, mealid, imgs, reviewstar, token)}>submit review</button>
            </div>
          </div> : null}
          </div>
        </div>
        : null
      }
      </div>
    )
  }
}


const MealContainer = ReactRedux.connect(state=>state, actions)(Meal)

export default MealContainer;
