import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Search.action";
import {Link, IndexLink} from "react-router";

const Search = (props)=>
  <div>
    <label>keywords:</label>
    <input value={props.search.keyword} onChange={props.searchKeywordChange}/>
    <label>city:</label>
    <input value={props.search.city} onChange={props.searchcityChange}/>
    <label>state:</label>
    <input value={props.search.state} onChange={props.searchstateChange}/>
    <Link to="/searchresult"><button>search</button></Link>
  </div>


const SearchContainer = ReactRedux.connect(state=>state, actions)(Search)

export default SearchContainer;
