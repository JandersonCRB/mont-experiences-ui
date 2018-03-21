import React, { Component } from 'react'

import Card, { CardActions, CardMedia, CardHeader } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

import FileUploadIcon from 'material-ui-icons/FileUpload';
import DeleteIcon from 'material-ui-icons/Delete';
import CoverIcon from 'material-ui-icons/PartyMode';

import { inject, observer } from 'mobx-react';
import _ from 'lodash';

const styles = {
	card: {
		maxWidth: 345,
	},
	media: {
		height: 200,
	},
};

@inject('experience') @observer
class EditPhotos extends Component {
	constructor() {
		super();
		this.state = {
			disabled: false
		}
	}
	componentWillMount() {
		const { experience } = this.props;
		const { experienceId } = this.props.params;
		experience.loadPhotos(experienceId, {
			200: (body) => experience.setSelected(body)
		})
	}

	upload(e) {
		const { experience } = this.props;
		const id = this.props.params.experienceId;
		let body = this.photos.files;
		this.setState({ disabled: true })
		experience.uploadPhotos(id, body, {
			201: (body) => {
				experience.setSelected(body);
				this.setState({ disabled: false });
			},
			default: () => this.setState({ disabled: false })
		})
	}

	deletePhoto(id) {
		const { experience } = this.props;
		const { experienceId } = this.props.params;

		experience.deletePhoto(experienceId, id, {
			200: (body) => {
				experience.setSelected(body);
			}
		});
	}

	setCoverPhoto(id) {
		const { experience } = this.props;
		const { experienceId } = this.props.params;
		experience.setCoverPhoto(experienceId, id, {
			200: (body) => {
				experience.setSelected(body);
			}
		});
	}
	
	renderPhotos(selected) {
		return (
			selected.photos.map(photo => {
				return (
					<div key={photo.id} className="col-12 col-sm-6 col-md-4 mb-3">
						<Card style={styles.card}>
							<CardMedia style={styles.media} image={photo.url}>
								{photo.id === (selected.cover_photo ? selected.cover_photo.id : -1) ? <CardHeader title="Foto de capa" style={{ backgroundColor: 'purple' }} /> : null}
							</CardMedia>
							<CardActions>
								<Tooltip id="tooltip-icon" title="Deletar">
									<IconButton color='primary' aria-label="Deletar">
										<DeleteIcon onClick={() => this.deletePhoto(photo.id)} />
									</IconButton>
								</Tooltip>
								<Tooltip id="tooltip-icon" title="Marcar como foto de capa">
									<IconButton color='primary' aria-label="Marcar como foto de capa">
										<CoverIcon onClick={() => this.setCoverPhoto(photo.id)} />
									</IconButton>
								</Tooltip>
							</CardActions>
						</Card>
					</div>
				);
			})
		)
	}

	render() {
		const { isLoading } = this.props.experience;
		const selected = this.props.experience.selected;
		if (isLoading && _.isEmpty(selected)) {
			return (
				<div className="container">
					<div className="row">
						<CircularProgress className="mx-auto" thickness={7} />
					</div>
				</div>
			);
		}
		return (
			<div className="container">
				<h1>Fotos</h1>
				<input
					style={{ display: 'none' }}
					ref={field => (this.photos = field)}
					accept="image/*"
					id="raised-button-file"
					multiple
					type="file"
					disabled={this.state.disabled}
					onChange={(e) => this.upload(e)}
				/>
				<label htmlFor="raised-button-file">
					<Button variant="raised" color='primary' component="span">
						Upload
						<FileUploadIcon className="ml-1" />
					</Button>
				</label>
				<hr />
				<div className="row">
					{this.renderPhotos(selected)}
				</div>
			</div>
		)
	}
}

export default EditPhotos