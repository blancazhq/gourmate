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
      <div>
          <p>sign up</p>
          <label>username</label><input type="text" value={data.username} onChange={this.props.usernameChange}/><br/>
          <label>password</label><input type="password" value={data.password} onChange={this.props.passwordChange}/><br/>
          <label>name</label><input type="text" value={data.name} onChange={this.props.nameChange}/><br/>
          <label>address</label><input type="text" value={data.address} onChange={this.props.addressChange}/><br/>
          <label>city</label><input type="text" value={data.city} onChange={this.props.cityChange}/><br/>
          <label>state</label><input type="text" value={data.state} onChange={this.props.stateChange}/><br/>
          <label>phone number</label><input type="text" value={data.phonenumber} onChange={this.props.phonenumberChange}/><br/>
          <label>email</label><input type="text" value={data.email} onChange={this.props.emailChange}/><br/>
          <label>introduction title</label><input type="text" value={data.introtitle} onChange={this.props.introtitleChange}/><br/>
          <label>introduction content</label><textarea cols="50" rows="4" value={data.introcontent} onChange={this.props.introcontentChange}/><br/>
          <label>food that you like</label><textarea cols="50" rows="4" value={data.foodpreference} onChange={this.props.foodpreferenceChange}/><br/>
          <label>food you don&#39;t eat</label><textarea cols="50" rows="4" value={data.foodrestriction} onChange={this.props.foodrestrictionChange}/><br/>
          <button onClick={this.props.profileimguploadChange}>upload your profile image</button>
          {data.img ? <img src={data.img} width="50px"/> : null}
          <button onClick={()=>this.props.signUp(data)}>SignUp</button>
          <p>{this.props.error}</p>
      </div>
    )
  }
}

const SignupContainer = ReactRedux.connect(state=>state.signup, actions)(Signup)

export default SignupContainer
