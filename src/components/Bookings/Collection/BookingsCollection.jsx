import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';

import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import purple from 'material-ui/colors/purple';

import { Link } from 'react-router';

@inject('booking') @observer
class BookingsCollection extends Component {

    componentDidMount() {
        const { booking } = this.props;

        booking.findAll();
    }


    renderBooking = (booking) => {
        return (
            <div className="col-md-5 m-2">
                <Paper>
                    <h1>{booking.name}</h1>
                    <Link to={`bookings/${booking.id}`}>Ver detalhes</Link>
                    <br />
                    <span>{booking.dates}</span><br/>
                    <span>{booking.name}</span><br/>
                    <span>{booking.adults}</span><br/>
                    <span>{booking.price}</span><br/>

                </Paper>
            </div>
        )
    }

    renderBookingsCollection = (collection) => {
        return (
            <div className='row'>

                {collection.slice().map(booking => {
                    return this.renderBooking(booking);
                })}
            </div>
        )
    }
    render() {
        const { collection, isLoading } = this.props.booking;
        if (isLoading) {
            return <CircularProgress className="mr-auto ml-auto" style={{ color: purple[500] }} thickness={7} />;
        } else {
            return (
                <div className="container">
                    {this.renderBookingsCollection(collection)}
                </div>
            )
        }
    }
}

export default BookingsCollection