import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Search.action";
import {Link, IndexLink} from "react-router";

const Search = (props)=>
  <div id="search_div">
    <div id="search_area">
    <input value={props.search.keyword} onChange={props.searchKeywordChange} placeholder="type in keyword (breakfast, Mexican...)"/>
    <input value={props.search.city} onChange={props.searchcityChange} placeholder="city"/>
    <input value={props.search.state} onChange={props.searchstateChange} placeholder="state"/>
    <Link id="search_buttton_link" to="/searchresult"><button>search</button></Link>
    </div>
  </div>


const SearchContainer = ReactRedux.connect(state=>state, actions)(Search)

export default SearchContainer;
