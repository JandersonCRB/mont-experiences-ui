import React, { Component } from "react";

import { inject, observer } from 'mobx-react';

import Card from '../Card/Card';

import ExperienceList from "../Experiences/List/ExperienceList";

import purple from 'material-ui/colors/purple';
import { CircularProgress } from 'material-ui/Progress'
import './Home.scss';

@inject('experience') @observer
export default class Home extends Component {
	componentDidMount() {
		// this.props.experiences.fetchAll();

		const experience = this.props.experience;

		experience.findAll();
	}

	renderExperiences(collection, isLoading) {
		if (isLoading) {
			return <CircularProgress className="mr-auto ml-auto" style={{ color: purple[500] }} thickness={7} />
		} else {
			return (
				collection.slice().map((info, key) => (
					<div key={key} className="col-12 col-sm-5 col-md-4 col-lg-3 col-xs-1 ml-auto mr-auto">
						<Card {...info} />
					</div>
				))
			)
		}
	}

	render() {
		const { collection } = this.props.experience;
		
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="home-welcome">
							<h1 className="home-title">Descubra e agende experiências
							<br className="hidden-xs" />incríveis!
						</h1>
							<p className="lead">
								As melhores atividades, passeios e aventuras em um só lugar!
						</p>
						</div>
					</div>
				</div>
				<div className="experiences-section">
					<div className="container">
						<div className="row">
								<div className="experiences-list">
									<ExperienceList collection={collection} />
								</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
