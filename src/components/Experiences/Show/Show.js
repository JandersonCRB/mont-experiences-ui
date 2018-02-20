import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('experience') @observer
export default class Show extends React.Component {

	componentWillMount() {
		const { experience } = this.props;
		experience.findBy({ id: this.props.params.experienceId }, {
			200: (body) => {
				experience.setSelected(body);
				this.setState({ values: body });
			},
			404: () => { this.notFound = true; }
		}); //GET REQUEST
	}

	renderTopics(selected) {
		let buffer = [];

		if (selected.description) {
			buffer.push(
			<div className="experience-topic" style={{whiteSpace: 'pre-line'}}>
				<h4>A Experiência</h4>
				{selected.description}
			</div>
		);
		}
		return buffer;
	}

	render() {
		const { selected } = this.props.experience;
		return (
			<div id="Show" className="container">
				<div>
					<h2><strong>{selected.name}</strong></h2>
				</div>
				<hr />
				{this.renderTopics(selected)}
			</div>
		)
	}
}
