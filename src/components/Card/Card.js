import React from 'react';

import { Link } from 'react-router';
import './Card.scss';

export default class Card extends React.Component {

	render() {
		return (
			<div className="card-block">
				<div className="card card-experience ml-auto mr-auto">
					<Link to={`experiences/${this.props.id}`} style={{ textDecoration: 'none' }}>
						<div className="img-wrap">
							<img src={this.props.cover_photo_url} alt="" />
						</div>
						<div className="content-wrap">
							<div className="content">
								<span className="category">
									Praias
								</span>
								<div className="title-block">
									<h5 className="title">{this.props.name}</h5>
								</div>
								<span className="price">{this.props.price}</span>
							</div>
						</div>
					</Link>
				</div>
			</div>
		)
	}
}