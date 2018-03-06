import React, { Component } from 'react'

class UserSidebar extends Component {
    render () {
        return (
            <div>
                Hi
                {this.props.children}
            </div>
        )
    }
}

export default UserSidebar