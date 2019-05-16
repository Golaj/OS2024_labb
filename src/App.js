import React, { Component } from 'react';
import './style/App.css';
import Form from "./components/Form/Form"
import rome2rio from "./utils/rome2rio"
import RouteList from "./components/RouteList/RouteList"
import Filters from "./components/Filters"
import headerLogo from "./pics/headerLogo.png"


import "./components/tablet.css"

class App extends Component {
  state = {
    routeData : null,
    filterAir: false,
    filterRail: false,
    filterBus: false,
    filterCar: false,

  };

  searchNewRoute = async (from, to, filters) => {
    const routeData = await rome2rio.searchRoute(from, to, filters)
    this.setState(({
      filters,
      routeData
    }));
    console.log(routeData);
  }

  resetList = () => {
    this.setState({
      routeData : null
    })
  }

  updateFilters = (event) => {
    const { name, checked } = event.target;
    this.setState({
        [name]: checked
    })
    console.log(name + ": " + checked);
}

  render() {

    let data = this.state.routeData ? {...this.state.routeData} : null;
    console.log(data);
    if (data){
      data.routes = data.routes
      .filter(element => {
        return this.state.filterAir 
        ? !element.name.toUpperCase().includes("FLY")
        : true;
      })
      .filter(element => {
        return this.state.filterRail 
        ? !element.name.toUpperCase().includes("TRAIN")
        : true;
      })
      .filter(element => {
        return this.state.filterBus
        ? !element.name.toUpperCase().includes("BUS")
        : true;
      })
      .filter(element => {
        return this.state.filterCar
        ? !element.name.toUpperCase().includes("DRIVE")
        : true;
      })
    }
      /*if(this.state.filterAir && this.state.filterBus && this.state.filterRail && this.state.filterCar){
        return{
          <div></div>

        }

      } */


    const filterButtons = <Filters filterFunc={this.updateFilters} {...this.state}/>
    const showResults = data
    ?  <RouteList routeData={data}  filterButtons={filterButtons} className ="routePlaces"/> 
    : null

    return (
      <div className="grid-container">
    
    <header>
        <a href="/" className="headerLogo"><img src={headerLogo} alt="2sweden logo"/></a>
    </header>

        <nav>
          <a href="/">Sök resor</a>
          <a href="/">Läs om eventet</a>
          <a href="/">Läs om våra orter</a>
          <a href="/">Se rekommendationer</a>
        </nav>
        
        <main>

        </main>
          
        <footer>
          <div className="footerInfo1">
            <a href="/">Kontakt</a>
            <a href="/">Om oss</a>
          </div>
          <div className="footerInfo2">
            <a href="https://bit.ly/2vOZHyk%22%3EÅrstavägen 19">Årstavägen 19</a>
            <a href="/">08-557 683 53</a>
          </div>        
        </footer> 
          
      </div>
        );
      }
    }

export default App;
