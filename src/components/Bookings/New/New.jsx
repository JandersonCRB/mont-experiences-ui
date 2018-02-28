import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

@inject('experience')
@inject('booking')
@inject('current_user') @observer
class BookingsNew extends Component {
    
    componentWillMount () {
        const {user, booking, expereince} = this.props;

    }
    
    render () {
        return (
            <div>
                aiuwhausi
            </div>
        )
    }
}

export default BookingsNew;