import React from 'react';
import { connect } from 'react-redux';
import AppAction from '../store/Actions/AppActions';
import Loader from 'react-loader-spinner';

class ETA extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        console.log("from eta component: ", this.props.coordinates)
        setTimeout(() => {
            this.props.getETAInfo({ origin: this.props.coordinates[0].lat + ", " + this.props.coordinates[0].lng, des: this.props.coordinates[this.props.coordinates.length - 1].lat + ", " + this.props.coordinates[this.props.coordinates.length - 1].lng });
        }, 500);
    }

    render() {
        console.log("from eta component: ", this.props.coordinates)
        return (
            <div>
                {
                    this.props.etaProgress ?
                        // false ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Loader type="RevolvingDot" color="#1f317e" height={30} width={30} />
                        </div>
                        :
                        <div style={{ fontSize: "1.5em", fontWeight: "500", color: "#636e72" }}>
                            <div>
                                ETA: {this.props.eta}
                            </div>
                            <div>
                                Distance: {this.props.distance}
                            </div>
                        </div>
                }
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    console.log('from home reducers state: ', state)
    return {
        etaProgress: state.appReducer.etaProgress,
        eta: state.appReducer.eta,
        distance: state.appReducer.distance
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getETAInfo: (obj) => dispatch(AppAction.getETAInfo(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ETA);
