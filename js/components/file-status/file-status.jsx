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
		let downloadLink;
		if(this.state.downloadURL) {
			downloadLink = <a download={this.state.name} href={this.state.downloadURL}>Download</a>;
		}
		return (
			<div className="file-status">
				<a href="javascript:void(0);">Name: {this.state.name}</a><br/>
				Size: {this.state.length}<br/>
				progress: {Math.floor(this.state.downloaded/this.state.length*100)}%<br/>
				{downloadLink}
			</div>
		);
	}
}