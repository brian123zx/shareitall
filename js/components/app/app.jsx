import React from 'react';
import { bindAll } from 'lodash';
// import WebTorrent from 'webtorrent';
const WebTorrent = require('webtorrent/webtorrent.min');
import TorrentCreator from '../torrent-creator/torrent-creator';
import SharedTorrent from '../shared-torrent/shared-torrent';
import './app.less';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {};
		bindAll(this, 'onFilesPicked');
		this.client = new WebTorrent();
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
		let torrentViews;
		if(this.props.shareURL) {
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
				{torrentViews}
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