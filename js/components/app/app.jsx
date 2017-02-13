import React from 'react';
import { bindAll, each } from 'lodash';
// import WebTorrent from 'webtorrent';
const WebTorrent = require('webtorrent/webtorrent.min');
import TorrentCreator from '../torrent-creator/torrent-creator';
import SharedTorrent from '../shared-torrent/shared-torrent';
import TorrentStatus from '../torrent-status/torrent-status';

import './app.less';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {};
		bindAll(this, 'onFilesPicked');
		this.client = new WebTorrent();
	}
	componentDidMount() {
		if(this.props.shareURL) {
			const torrent = this.client.add(this.props.shareURL, undefined, (torrent) => {
				_.each(torrent.files, (file) => {
					file.getBlobURL((err, url) => {
						console.log('downloaded', url);
					});
				});
			});
			this.setState({
				incomingTorrent: torrent
			});
		}
	}
	onFilesPicked(files) {
		// create torrent, add files

		// seed files
		this.client.seed(files, undefined, (torrent) => {
			this.setState({
				sharedTorrent: torrent
			});
		});
	}
	render() {
		// if no support
		if(!WebTorrent.WEBRTC_SUPPORT) {
			return (
				<div>
					Your browser isn't supported :(
				</div>
			);
		}

		let torrentCreator;
		let sharedTorrent;
		let incomingTorrent;
		if(this.state.incomingTorrent) {
			incomingTorrent = <TorrentStatus torrent={this.state.incomingTorrent} role="download" />
		} else {
			if(this.state.sharedTorrent) {
				sharedTorrent = <SharedTorrent torrent={this.state.sharedTorrent} />
			} else {
				torrentCreator = <TorrentCreator onFilesPicked={this.onFilesPicked} />
			}
		}

		return (
			<div>
				{torrentCreator}
				{sharedTorrent}
				{incomingTorrent}
			</div>
		);

		return (
			<div>

				<div id="nosupport">
					Your browser isn't supported :(
				</div>
				<div id="statusContainer">
					<h3>This is what's happening:</h3>
				</div>
			</div>
		);
	}
}