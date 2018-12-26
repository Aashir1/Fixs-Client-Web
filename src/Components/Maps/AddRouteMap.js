import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps";
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

    // this.props = Object.assign({}, { ...props }, { ...this.props })
    return (
        < GoogleMap
            defaultZoom={15}
            defaultCenter={props.defaultCenter}
            accuracy={props.accuracy}
            onClick={(event) => {
                console.log('event: ', event)
                // var lat = event.latLng.lat(), lng = event.latLng.lng()
                // console.log('lat: ', event.latLng.lat());
                // console.log('lng: ', event.latLng.lng());
                // // this.setState({
                // //     wayPoint: [...this.state.wayPoint, { lat: event.latLng.lat(), lng: event.latLng.lng() }]
                // // })
                props.mapClicked(event);
            }
            }

        >
            {
                props.wayPoint.map((data, i) => {
                    // console.log('data: ', data)
                    return (
                        <Marker
                            key={i}
                            draggable={true}
                            onDragEnd={(e) => {
                                props.updateMarkerLocation(e, i)
                                console.log('marker draged: ', e);
                            }}
                            position={data}
                            onClick={(e) => {
                                console.log("you click me: ", e);
                                props.showThisInfoBox(e, i);
                            }}>
                            {
                                data.showInfoBox &&
                                <InfoWindow position={data}>
                                    <div>
                                        <h6>Want to delete Marker</h6>
                                        <button onClick={() => {
                                            props.deleteMarker(i)
                                        }} style={{
                                            maxWidth: '100%',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            whiteSpace: 'nowrap',
                                            /* width: 100%; */
                                            color: '#0B2239',
                                            background: '#49d295',
                                            borderRadius: '3px',
                                            borderWidth: '0px',
                                            height: '39px',
                                            /* line-height: 39px !important; */
                                            width: '3rem',
                                            marginLeft: '0.5rem'

                                        }}>
                                            Yes
                                        </button>
                                        <button style={{
                                            maxWidth: '100%',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            whiteSpace: 'nowrap',
                                            /* width: 100%; */
                                            color: '#0B2239',
                                            background: '#49d295',
                                            borderRadius: '3px',
                                            borderWidth: '0px',
                                            height: '39px',
                                            /* line-height: 39px !important; */
                                            width: '3rem',
                                            marginLeft: '0.5rem'

                                        }}>
                                            No
                                </button>
                                    </div>
                                </InfoWindow>
                            }
                        </Marker>
                    )
                })
            }
        </GoogleMap >
    )
})




export default MyMapComponent;