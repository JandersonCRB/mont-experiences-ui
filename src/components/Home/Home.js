import React from 'react';

import { inject, observer } from 'mobx-react';

import Card from '../Card/Card';

import purple from 'material-ui/colors/purple';
import { CircularProgress } from 'material-ui/Progress'
import './Home.scss';

@inject('experience') @observer
export default class Home extends React.Component {
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
		const { collection, isLoading } = this.props.experience;

		return (
			<div>
				<section className="pt32 pb48">
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<h1 className="cover--title">Descubra e agende experiências
								<br className="hidden-xs" />incríveis!
							</h1>
								<p className="lead">
									Os melhores passeios, aventuras e atividades em um só lugar, <br />
									com o melhor preço!
							</p>
							</div>
						</div>
					</div>
				</section>
				<section className="pb32 section--row">
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<h3>Recomendados pela Mont em Maceió</h3>
							</div>
						</div>
						<div className="row">
							{this.renderExperiences(collection, isLoading)}
						</div>
						<div className="see_more pt24">
							<a href="#">Mais em Maceió<i className="icon icon--sm icon-Arrow-Forward2"></i></a>
						</div>
						<hr className="mb8" />
					</div>
				</section>
				<section className="pt64 pb64">
					<div className="container">

						<div className="row">
							<div className="col-sm-12">
								<h3>Por que a Mont?</h3>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-4">
								<div className="feature feature-2 boxed boxed--border"> <i className="icon icon-Skydiving color--primary"></i>
									<div className="feature__body">
										<p> Experiências incríveis, curadas pelo time da Mont, para que você aproveite ao máximo! </p>
									</div>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="feature feature-2 boxed boxed--border"> <i className="icon icon-Calendar-4 color--primary"></i>
									<div className="feature__body">
										<p> Agende com comodidade e o melhor preço </p>
									</div>
								</div>
							</div>
							<div className="col-sm-4">
								<div className="feature feature-2 boxed boxed--border"> <i className="icon icon-Support color--primary"></i>
									<div className="feature__body">
										<p> Oferecemos todo o suporte para que sua viagem seja tranquila e segura. </p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}