import React from "react";
import * as ReactRedux from "react-redux";
import * as actions from "./Search.action";
import {Link, IndexLink} from "react-router";
import Waypoint from "react-waypoint";
import TransitionGroup from "react-transition-group/CSSTransitionGroup"

class Search extends React.Component{
  componentDidMount(){
    this.props.getFeaturedMeals()
  }

  render(){
    let data = this.props.search.data;

    return (
      <div>
        <div id="search_div">
          <h1>Gourmate</h1>
          <h4>When you share, food tastes better.</h4>
          <div id="search_area">
          <input value={this.props.search.keyword} onChange={this.props.searchKeywordChange} placeholder="type in keyword (breakfast, Mexican...)"/>
          <input value={this.props.search.city} onChange={this.props.searchcityChange} placeholder="city"/>
          <input value={this.props.search.state} onChange={this.props.searchstateChange} placeholder="state"/>
          <Link id="search_buttton_link" to="/searchresult"><button>search</button></Link>
          </div>
        </div>
        <div id="featured_meals_div">
          {data ?
           <div>
              <div id="starmeal_div" className="cf">
                <Waypoint
                scrollableAncestor={window}
                onEnter={this.props.div1Enter}
                bottomOffset={'20%'}
                />

                <TransitionGroup
                  transitionName="image1"
                  transitionEnterTimeout={500}
                  >
                {this.props.search.div1Entered ? <img src="http://res.cloudinary.com/dpcq8lowe/image/upload/v1495651441/download_wgxlsc.jpg"/> : null}
                </TransitionGroup>

                <TransitionGroup
                  transitionName="content1"
                  transitionEnterTimeout={500}
                  >
                  {this.props.search.div1Entered ? <div id="starmeal_content_div">
                    <h4>FEATURED MEAL</h4>
                    <h2>{data.starmeal.title}</h2>
                    <div className="separation_line"></div>
                    <div id="starmeal_star" className={"display_star star"+Math.round(data.starmeal.star)}></div>
                    <p>{data.starmeal.content}</p>
                    <p>{data.starmeal.mealdate.slice(0, data.starmeal.mealdate.indexOf("T"))}</p>
                    <p>{data.starmeal.mealtime}</p>
                    <p>this meal is hosted by {data.starmeal.name}</p>
                    <Link className="search_detail_link"  to={"/meal/"+data.starmeal.meal_id}><button>see detail</button></Link>
                  </div> : null}
                </TransitionGroup>
              </div>

              <div id="mostpopular_div" className="cf">

                <Waypoint
                scrollableAncestor={window}
                onEnter={this.props.div2Enter}
                bottomOffset={'20%'}
                />

                <TransitionGroup
                transitionName="image2"
                transitionEnterTimeout={500}
                >
                  {this.props.search.div2Entered ?<img src="http://res.cloudinary.com/dpcq8lowe/image/upload/v1495651440/636034360643459128-507613226_indian_xsbilo.jpg"/>:null}
                </TransitionGroup>

                <TransitionGroup
                  transitionName="content2"
                  transitionEnterTimeout={500}
                  >
                {this.props.search.div2Entered ?
                <div id="mostpopular_content_div">
                  <h4>MOST POPULAR</h4>
                  <h2>{data.mostpopular.title}</h2>
                  <div id="mostpopular_separation_line"></div>
                  <div id="mostpopular_star" className={"display_star star"+Math.round(data.mostpopular.star)}></div>
                  <p>{data.mostpopular.content}</p>
                  <p>{data.mostpopular.mealdate.slice(0, data.mostpopular.mealdate.indexOf("T"))}</p>
                  <p>{data.mostpopular.mealtime}</p>
                  <p>{data.mostpopular.spottaken} people are going</p>
                  <p>this meal is hosted by {data.mostpopular.name}</p>
                  <Link className="search_detail_link"  to={"/meal/"+data.starmeal.meal_id}><button>see detail</button></Link>
                </div> :null}
                </TransitionGroup>

              </div>
              <div id="cheapest_div" className="cf">

              <Waypoint
              scrollableAncestor={window}
              onEnter={this.props.div3Enter}
              bottomOffset={'20%'}
              />

              <TransitionGroup
                transitionName="image3"
                transitionEnterTimeout={500}
                >
                {this.props.search.div3Entered ?<img src="http://res.cloudinary.com/dpcq8lowe/image/upload/v1495651651/noodle_rc1vdw.jpg"/>:null}
               </TransitionGroup>

               <TransitionGroup
                  transitionName="content3"
                  transitionEnterTimeout={500}
                  >
                {this.props.search.div3Entered ?<div id="cheapest_content_div">
                  <h4>LOOKING FOR A VALUABLE<br/> AND DELICIOUS MEAL? </h4>
                  <h2>{data.cheapest.title}</h2>
                  <div className="separation_line"></div>
                  <div id="cheapest_star" className={"display_star star"+Math.round(data.cheapest.star)}></div>
                  <p>{data.cheapest.content}</p>
                  <p>{data.cheapest.mealdate.slice(0, data.cheapest.mealdate.indexOf("T"))}</p>
                  <p>{data.cheapest.mealtime}</p>
                  <p>this meal is hosted by {data.cheapest.name}</p>
                  <Link className="search_detail_link" to={"/meal/"+data.starmeal.meal_id}><button>see detail</button></Link>
                </div>:null}
               </TransitionGroup>
              </div>
            </div>
           : null}
        </div>
      </div>
    )
  }
}

const SearchContainer = ReactRedux.connect(state=>state, actions)(Search)

export default SearchContainer;
