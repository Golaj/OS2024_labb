import React from 'react';
import { Trans } from "@lingui/macro"
import SimpleMap from './SimpleMap';
import Notifications, { notify } from 'react-notify-toast';
export default class Route extends React.Component {

    state = {
        collapseArrow: true,
    }

    getHours(min) {
        return Math.trunc(min / 60) + "h";
    }

    getMin(min) {
        return min % 60 + "min";
    }

    getKm(distance) {
        return Math.trunc(distance) + "km";
    }

    openTripDetails = () => {
        document.getElementById('tripDetails').addEventListener('click', function () {
            document.querySelector('.background-modal').style.display = 'flex';
        })
    }

    componentDidMount = () => {
        this.setState({
            collapseArrow: true,
        })
    }

    handleOnClick = () => {
        this.setState({ collapseArrow: !this.state.collapseArrow })
    }

    render() {
        const props = this.props;
        const origin = props.from;
        const destination = props.to;
        const userId = localStorage.getItem("userId");
        const distance = this.getKm(props.distance);
        const duration = this.getHours(props.totalDuration) + " " + this.getMin(props.totalDuration);
        const transport = props.name;
        let simpleMap = this.state.collapseArrow ? null : <SimpleMap startCords={this.props.places[0]} destinationCords={this.props.places[1]} />

        async function putRouteToSavedList() {
            let price;
            const priceList = props.indicativePrices;
            if (priceList) {
                if (priceList[0].priceLow) { price = priceList[0].priceLow + " " + priceList[0].currency}
                else if (priceList[0].name) { price = priceList[0].price + " " + priceList[0].currency}
            } else { price = "Not available" }
            await fetch(`http://localhost:3000/os2024back/webresources/savedtravelentity/${origin}/${destination}
        /${userId}/${distance}/${duration}/${price}/${transport}`)
            notify.show(<Trans>Route is saved!</Trans>, "success", 5000) // make custom instead of success and add a forth parameter for color option
        }
     
        return (

            <div className="cardContainer">

                <Notifications options={{ top: '120px' }} />
                <div className="transport">
                    {props.segments.map(element => {
                        const vehicle = props.vehicles[element.vehicle].name;
                        switch(vehicle){
                            case "Car":
                            case "Taxi":
                            case "Towncar":
                            case "Uber":
                                return <i className="fas fa-car"></i>;
                            case "Plane":
                                return <i className="fas fa-plane"></i>;
                            case "Bus":
                                return <i className="fas fa-bus"></i>;
                            case "Tram":
                                return <i className="fas fa-tram"></i>;
                            case "Metro":
                            case "Subway":
                            case "Train":
                                return <i className="fas fa-train"></i>;
                            case "Walk":
                                return <i className="fab fa-accessible-icon"></i>;
                            default:
                                return <p>{vehicle}</p>
                        }
                    })}
                </div>
                <div className="distance"><i className="fas fa-road fa-2x" ></i>: {this.getKm(props.distance)}</div>
                <div className="duration"><i className="far fa-clock fa-2x"></i>: {this.getHours(props.totalDuration)} {this.getMin(props.totalDuration)}</div>
                <div className="price"><i className="far fa-money-bill-alt fa-2x"></i>: {props.indicativePrices ?
                    props.indicativePrices.map((x, index) => (
                        <span key={index}>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                            : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
                    )) : "Not available"}
                </div>

                <button className="saveButton glow-button" onClick={putRouteToSavedList}><Trans>Add Route to saved list</Trans></button>
                <button className="mapButton glow-button" onClick={this.handleOnClick}>show map</button>
                {simpleMap}
            </div>
        )
    }
}


