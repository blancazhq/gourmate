import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Signup.actions"

class Signup extends React.Component{
  render(){
    let data = {
      username: this.props.username,
      usernameIsValid: this.props.usernameIsValid,
      password: this.props.password,
      passwordIsValid: this.props.passwordIsValid,
      name: this.props.name,
      nameIsValid: !!this.props.name,
      address: this.props.address,
      addressIsValid: !!this.props.address,
      city: this.props.city,
      cityIsValid: !!this.props.city,
      state: this.props.state,
      stateIsValid: this.props.stateIsValid,
      phonenumber: this.props.phonenumber,
      phonenumberIsValid: this.props.phonenumberIsValid,
      email: this.props.email,
      emailIsValid: this.props.emailIsValid,
      introtitle: this.props.introtitle,
      introtitleIsValid: !!this.props.introtitle,
      introcontent: this.props.introcontent,
      introcontentIsValid: !!this.props.introcontent,
      foodpreference: this.props.foodpreference,
      foodpreferenceIsValid: !!this.props.foodpreference,
      foodrestriction: this.props.foodrestriction,
      foodrestrictionIsValid: !!this.props.foodrestriction,
      img: this.props.img
    }

    let validator = data.usernameIsValid
    && data.passwordIsValid
    && data.nameIsValid
    && data.addressIsValid
    && data.cityIsValid
    && data.stateIsValid
    && data.phonenumberIsValid
    && data.emailIsValid
    && data.introtitleIsValid
    && data.introcontentIsValid
    && data.foodpreferenceIsValid
    && data.foodrestrictionIsValid

    return (
      <div id="signup_wrapper">
          <h4>sign up</h4>
          <div id="signup_content_wrapper" className="cf">
            <div id="signup_content_div1">
              <input className={data.usernameIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.username} onChange={this.props.usernameChange} placeholder="username"/>
              <input className={data.passwordIsValid? "signup_valid" : "signup_invalid"} type="password" value={data.password} onChange={this.props.passwordChange} placeholder="password" title="password has to be more than 8 characters and contain at least one upper case letter, one lower case letter and one special character"/>
              <input className={data.nameIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.name} onChange={this.props.nameChange} placeholder="nickname"/>
              <input className={data.addressIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.address} onChange={this.props.addressChange} placeholder="address"/>
              <input type="text" className={data.cityIsValid? "signup_valid" : "signup_invalid"} value={data.city} onChange={this.props.cityChange} placeholder="city"/>
              <input className={data.stateIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.state} onChange={this.props.stateChange} placeholder="state" title="enter valid American state. (GA TX)"/>
            </div>
            <div id="signup_content_div2">
              <input className={data.phonenumberIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.phonenumber} onChange={this.props.phonenumberChange} placeholder="phone number" title="enter valid American phone number"/>
              <input className={data.emailIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.email} onChange={this.props.emailChange} placeholder="email"/>
              <input className={data.introtitleIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.introtitle} onChange={this.props.introtitleChange} placeholder="introduction title"/>
              <input className={data.introcontentIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.introcontent} onChange={this.props.introcontentChange} placeholder="introduction content"/>
              <input className={data.foodpreferenceIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.foodpreference} onChange={this.props.foodpreferenceChange} placeholder="food that you like"/>
              <input className={data.foodrestrictionIsValid? "signup_valid" : "signup_invalid"} type="text" value={data.foodrestriction} onChange={this.props.foodrestrictionChange} placeholder="food that you don't eat"/>
            </div>
            <div id="signup_content_button_div">
              <button onClick={this.props.profileimguploadChange}>upload your profile image</button>
              {data.img ? <img src={data.img} width="50px"/> : null}
              <button onClick={()=>validator?this.props.signUp(data):null}>SignUp</button>
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
