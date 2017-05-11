import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Homepage.action"

const Homepage = (props)=>
  <div>
    <div>
      hello
      <img src="http://res.cloudinary.com/dpcq8lowe/image/upload/v1494445661/breakfast.jpg"/>
    </div>
  </div>


const HomepageContainer = ReactRedux.connect(state=>state, actions)(Homepage)

export default HomepageContainer;
