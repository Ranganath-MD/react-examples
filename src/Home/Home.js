import React, { Component } from 'react'
import DevImg from "../resources/images/dev.svg"

export default class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <h2 className="main-heading">React Exercise</h2>
                <div style={{ width: 350 }}>
                    <img src={DevImg} alt="dev" width="100%" />
                </div>
            </div>
        )
    }
}
