import React from 'react';
import { bindAll } from 'lodash';
import StateMachine from 'javascript-state-machine';
import TorrentStatus from '../torrent-status/torrent-status';

import './shared-torrent.less';

export default class SharedTorrent extends React.Component {
	constructor(props) {
		super();

		console.log('torrent seeded', props.torrent, props.torrent.magnetURI);
	}
	render() {
		let magnet = this.props.torrent.magnetURI;

		let shareurl = `${location.host}${location.pathname}?share=${encodeURIComponent(magnet)}`;

		return (
			<div className="shared-torrent">
				<h1>Great! Now just copy the url below and give it to a friend</h1>
				<input type="text" value={shareurl} />
				<TorrentStatus torrent={this.props.torrent} />
			</div>
		);
	}
}