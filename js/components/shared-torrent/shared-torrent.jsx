import React from 'react';

import './shared-torrent.less';

export default class SharedTorrent extends React.Component {
	constructor(props) {
		super();

		console.log('torrent seeded', props.torrent, props.torrent.magnetURI);
		this.setupListeners(props.torrent);
	}
	setupListeners(torrent) {
		_.map(['infoHash', 'metadata', 'ready', 'warning', 'error', 'wire', 'noPeers', 'download', 'upload'], (event) => {
			torrent.on(event, (arg) => {
				console.log(event, arg);
				const functionName = `event-${event}`;
				if(this[functionName]) {
					this[functionName](args);
				}
			});
		});
	}
	render() {
		let magnet = this.props.torrent.magnetURI;

		let shareurl = `${location.host}${location.pathname}?share=${encodeURIComponent(magnet)}`;
		return (
			<div className="shared-torrent">
				<h1>Great! Now just copy the url below and give it to a friend</h1>
				<input type="text" value={shareurl} />
			</div>
		);
	}
}




