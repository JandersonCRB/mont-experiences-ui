import React, { Component } from 'react'

import { inject, observer } from 'mobx-react';

import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';
import Paper from 'material-ui/Paper';

@inject('booking') @observer
class BookingsShow extends Component {
    componentWillMount() {
        const { booking } = this.props;
        const id = this.props.params.bookingId;
        booking.findBy({ id });
    }

    renderBooking = (booking) => {
        if(!booking) return null;
        return (
            <div className="col-sm-9 mx-auto">
                <Paper>
                    <h1>{booking.experience.name}</h1>
                    <span>{booking.status}</span><br/>
                    <span>{booking.dates}</span><br/>
                    <span>{booking.adults}</span><br/>
                    <span>{booking.name}</span><br/>
                    <span>{booking.price}</span><br/>
                    <span>{booking.experience.price}</span><br/>
                    <span>{booking.cost}</span><br/>
                    <span>{booking.experience.payment_method}</span><br/>
                    <span>{booking.experience.cancelation}</span><br/>
                </Paper>
            </div>
        )
    }

    render() {
        const { isLoading, selected } = this.props.booking;
        if (isLoading) {
            return <CircularProgress className="mr-auto ml-auto" style={{ color: purple[500] }} thickness={7} />;
        } else {
            return (
                <div>
                    {this.renderBooking(selected)}
                </div>
            )
        }
    }
}

export default BookingsShow