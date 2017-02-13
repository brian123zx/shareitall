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
	}
	updateStats() {
		const { name, length, downloaded } = this.props.file;
		this.setState({
			name,
			length,
			downloaded
		});
	}
	render() {
		return (
			<div className="file-status">
				Name: {this.state.name}<br/>
				Size: {this.state.length}<br/>
				progress: {this.state.downloaded/this.state.length*100}%<br/>
			</div>
		);
	}
}