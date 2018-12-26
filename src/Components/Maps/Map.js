import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import Decoder from '@mapbox/polyline';
let coords = [], oldCoordinates = [];
// var saveData = (function () {
//     var a = document.createElement("a");
//     document.body.appendChild(a);
//     a.style = "display: none";
//     return function (data, fileName) {
//         var json = JSON.stringify(data),
//             blob = new Blob([json], { type: "octet/stream" }),
//             url = window.URL.createObjectURL(blob);
//         a.href = url;
//         a.download = fileName;
//         a.click();
//         window.URL.revokeObjectURL(url);
//     };
// }());
// let fileName = "my-download.json";

// saveData(oldCoordinates, fileName);

// let getDirection = () => {
//     // const HU_38 = "s`swCmjixK@l@H`CLbJZxNp@l\\PpILtEV|A~EnSpCzKjB|H`ApEzB`OpDxVLp@DLMHYVq@h@sG~FyDrD{GjG_DrCuAvAmAvA{BhCaBvB]b@{@p@y@XqB^uBd@oIrBiDfAw@XmAn@cDhB{CnB_GpD{@h@y@x@mA~AeAbB[^uAtAc@j@iAv@sBbAwCtAsFbCiA\\uATq@DaBLcDPkC`@iBj@e@PaBl@}@XaAN}BVeMhAeXtB_Mf@_IR_GNy@DeE?yFGsUQwA@_Gr@kSzCIB{Cb@sL~AmJvAwDd@_DT{@HsHd@_DFqJ^kLn@gZfAmI^yDJ_BHaBNuCb@oAPyANgBJuCLuFRkDM}CQmGNmBJeDh@mDd@}Gl@_MjA@N";
//     // const HU_38 = 'ko`xCmr_xKiBMw@CmA@cAD{BFkBLoARsDh@}Eh@qCRmLhAQ@@T';
//     oldCoordinates = JSON.parse(localStorage.getItem('coordinates'));
//     // var data = ...oldCoordinates;

//     // let point = Decoder.decode(HU_38);
//     // coords = point.map((point, index) => {
//     //     return {
//     //         lat: point[0],
//     //         lng: point[1]
//     //     }
//     // });

//     // coords.forEach((data) => {
//     //     oldCoordinates.push(data);
//     // });
//     // oldCoordinates = oldCoordinates.slice(0, 106)
//     console.log('oldCoordinate: ', oldCoordinates);
//     console.log('coords: ', coords.length);
//     // localStorage.setItem('coordinates', JSON.stringify(oldCoordinates));
// }
// getDirection();
class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wayPoint: []
        }
    }
    render() {
        const MyMapComponent = compose(
            withProps({
                // googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBbUr9k3JchtdRRTnyrl2opuLJkBd7XT_w",
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDDmyFwVLZ7Fys0sWTDMxa7h_Dyy79BXuM",
                // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAlbbgxWUYgCMqJO4kAOP6uIELN2DUQl7g&callback=initMap",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `400px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap
        )((props) => {

            this.props = Object.assign({}, { ...props }, { ...this.props })
            return (
                < GoogleMap
                    defaultZoom={15}
                    defaultCenter={this.props.coordinates[0]}
                    accuracy={this.props.accuracy}
                    onClick={(event) => {
                        console.log('event: ', event)
                        // var lat = event.latLng.lat(), lng = event.latLng.lng()
                        console.log('lat: ', event.latLng.lat());
                        console.log('lng: ', event.latLng.lng());
                        
                    }
                    }

                >
                    {this.props.isMarkerShown && <Marker position={this.props.coordinates[0]} onClick={this.props.onMarkerClick} />}
                    < Polyline
                        onClick={() => alert('clicked')}
                        path={this.props.coordinates}
                        geodesic={true}
                        options={{
                            strokeColor: "#000",
                            strokeOpacity: 0.75,
                            strokeWeight: 5,
                        }}
                    />
                    {this.props.isMarkerShown && <Marker position={this.props.coordinates[this.props.coordinates.length - 1]} onClick={this.props.onMarkerClick} />}
                </GoogleMap >
            )
        }
        )
        return (
            <MyMapComponent />
        )
    }

}



export default Map;