import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Signup.actions"

class Signup extends React.Component{
  render(){
    let data = {
      username: this.props.username,
      password: this.props.password,
      name: this.props.name,
      address: this.props.address,
      city: this.props.city,
      state: this.props.state,
      phonenumber: this.props.phonenumber,
      email: this.props.email,
      introtitle: this.props.introtitle,
      introcontent: this.props.introcontent,
      foodpreference: this.props.foodpreference,
      foodrestriction: this.props.foodrestriction,
      img: this.props.img
    }
    return (
      <div id="signup_wrapper">
          <h4>sign up</h4>
          <div id="signup_content_wrapper" className="cf">
            <div id="signup_content_div1">
              <input type="text" value={data.username} onChange={this.props.usernameChange} placeholder="username"/>
              <input type="password" value={data.password} onChange={this.props.passwordChange} placeholder="password"/>
              <input type="text" value={data.name} onChange={this.props.nameChange} placeholder="nickname"/>
              <input type="text" value={data.address} onChange={this.props.addressChange} placeholder="address"/>
              <input type="text" value={data.city} onChange={this.props.cityChange} placeholder="city"/>
              <input type="text" value={data.state} onChange={this.props.stateChange} placeholder="state"/>
            </div>
            <div id="signup_content_div2">
              <input type="text" value={data.phonenumber} onChange={this.props.phonenumberChange} placeholder="phone number"/>
              <input type="text" value={data.email} onChange={this.props.emailChange} placeholder="email"/>
              <input type="text" value={data.introtitle} onChange={this.props.introtitleChange} placeholder="introduction title"/>
              <input type="text" value={data.introcontent} onChange={this.props.introcontentChange} placeholder="introduction content"/>
              <input type="text" value={data.foodpreference} onChange={this.props.foodpreferenceChange} placeholder="food that you like"/>
              <input type="text" value={data.foodrestriction} onChange={this.props.foodrestrictionChange} placeholder="food that you don't eat"/>
            </div>
            <div id="signup_content_button_div">
              <button onClick={this.props.profileimguploadChange}>upload your profile image</button>
              {data.img ? <img src={data.img} width="50px"/> : null}
              <button onClick={()=>this.props.signUp(data)}>SignUp</button>
            </div>
            <p>{this.props.error}</p>
          </div>
          <div id="signup_decor">
          </div>
      </div>
    )
  }
}

const SignupContainer = ReactRedux.connect(state=>state.signup, actions)(Signup)

export default SignupContainer
