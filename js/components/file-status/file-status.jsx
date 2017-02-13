import React from 'react';
import { bindAll } from 'lodash';

import './file-status.less';

export default class FileStatus extends React.Component {
	constructor(props) {
		super();
		this.state = {};
		bindAll(this, 'updateStats');
	}
	componentDidMount() {
		this.updateInterval = setInterval(this.updateStats, 1000);
		this.updateStats();
		this.getBlobURL();
	}
	componentWillUnmount() {
		clearInterval(this.updateInterval);
	}
	updateStats() {
		const { name, length, downloaded } = this.props.file;
		this.setState({
			name,
			length,
			downloaded
		});
	}
	getBlobURL() {
		this.props.file.getBlobURL((err, url) => {
			this.setState({
				downloadURL: url
			});
		});
	}
	render() {
		let progress = this.state.downloadURL ? (
			<div>
				<label>Done!</label>
				<a download={this.state.name} href={this.state.downloadURL}>Download</a>
			</div>
		) : (
			<div>
				<label>Progress</label>
				{Math.floor(this.state.downloaded/this.state.length*100)}%
			</div>
		);
		return (
			<div className="file-status">
				<div>
					<label>Name</label>
					<a href="javascript:void(0);">{this.state.name}</a>
				</div>
				<div>
					<label>Size</label>
					{this.state.length}
				</div>
				{progress}
			</div>
		);
	}
}