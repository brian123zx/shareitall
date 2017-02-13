import React from 'react';
import { bindAll } from 'lodash';
import StateMachine from 'javascript-state-machine';
import FileStatus from '../file-status/file-status';

import './torrent-status.less';

export default class TorrentStatus extends React.Component {
	constructor(props) {
		super();
		bindAll(this, 'onEnterState', 'updateSpeeds');
		this.state = {
			status: 'waiting'
		};
		this.sm = StateMachine.create({
			initial: 'waiting',
			events: [
				{ name: 'connect', from: 'waiting', to: 'connected' },
				{ name: 'transfer', from: 'connected', to: 'transferring' },
				{ name: 'complete', from: 'transferring', to: 'done' }
			],
			callbacks: {
				onenterstate: this.onEnterState
			}
		});



		console.log('torrent seeded', props.torrent, props.torrent.magnetURI);
		this.setupListeners(props.torrent);
	}
	componentDidMount() {
		this.updateInterval = setInterval(this.updateSpeeds, 1000);
	}
	setupListeners(torrent) {
		_.map(['infoHash', 'metadata', 'ready', 'warning', 'error', 'wire', 'noPeers', 'download', 'upload', 'done'], (event) => {
			torrent.on(event, (arg) => {
				console.log(event, arg);
				const functionName = `event_${event}`;
				if(this[functionName]) {
					this[functionName](arg);
				}
			});
		});
	}
	onEnterState(event, prevState, curState) {
		console.log("entered state", arguments);
		this.setState({
			status: curState
		});
	}
	event_wire() {
		this.sm.connect();
	}
	event_download() {
		this.sm.transfer();
	}
	event_upload() {
		this.sm.transfer();
	}
	event_done() {
		this.sm.complete();
	}
	updateSpeeds() {
		let { downloadSpeed, uploadSpeed, numPeers, progress } = this.props.torrent;
		this.setState({
			downloadSpeed,
			uploadSpeed,
			numPeers,
			progress
		});
	}
	render() {
		let transferStatus;
		let peerNum;
		let downloadStatus;
		let files;
		if(~['connected', 'transferring'].indexOf(this.state.status)) {
			transferStatus = (
				<div className="transfer-status">
					Downloading: {this.state.downloadSpeed}, Uploading: {this.state.uploadSpeed}
				</div>
			);
			peerNum = (
				<div>
					Connected to {this.state.numPeers} peers
				</div>
			);
			downloadStatus = this.props.role === 'download' ? (
				<div>
					Progress: {this.state.progress*100}%
				</div>
			) : null;
			files = this.props.torrent.files.map((file) => {
				return <FileStatus key={file.name} file={file} />
			});
		}

		return (
			<div className="torrent-status">
				<div className="status">
					Status: {this.state.status}
				</div>
				{peerNum}
				{transferStatus}
				{downloadStatus}
				{files}
			</div>
		);
	}
}




