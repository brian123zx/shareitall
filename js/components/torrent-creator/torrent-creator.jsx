import React from 'react';
import { bindAll } from 'lodash';

import './torrent-creator.less';

export default class TorrentCreator extends React.Component {
	constructor() {
		super();
		bindAll(this, 'onFilesChanged');
	}
	onFilesChanged(e) {
		this.props.onFilesPicked(e.currentTarget.files);
	}
	render() {
		return (
			<div className="torrent-creator">
				<h1>Lets get started!</h1>
				<label>
					Pick some files
					<input type="file" id="myfileinput" multiple onChange={this.onFilesChanged} />
				</label>
			</div>
		);
	}
}




