require('file-loader?name=[name].[ext]!../index.html');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
// import WebTorrent from 'webtorrent';


$(() => {
	const app = <App />;
	ReactDOM.render(app, document.getElementById('app'));
});

(() => {

	window.client = new WebTorrent();
	console.log(client);


	let setupListeners = (torrent) => {
		_.map(['infoHash', 'metadata', 'ready', 'warning', 'error', 'wire', 'noPeers', 'download', 'upload'], (event) => {
			torrent.on(event, (arg) => {
				console.log(event, arg);
			});
		});
	};

	let setStatus = (status) => {
		$('#statusContainer').append(`<div>${status}</div>`);
	};

	$(() => {
		// try to get share url
		let urlparams = location.href.split('?');
		let sharedTorrent;
		if(urlparams.length > 1) {
			urlparams = urlparams[1].split('&');
			urlparams = _.reduce(urlparams, (obj, p) => {
				let split = p.split('=');
				obj[split[0]] = split[1];
				return obj;
			}, {});
			if(urlparams.share) {
				sharedTorrent = true;
				setStatus('adding shared torrent');
				let tor = client.add(decodeURIComponent(urlparams.share), undefined, (torrent) => {
					console.log('share torrent added!', torrent, torrent.path);
					setStatus('shared torrent added');
					let file = torrent.files[0];
					file.getBlobURL((err, url) => {
						console.log('blob', err, url);
						var a = document.createElement('a')
					  a.download = file.name
					  a.href = url
					  a.textContent = 'Download ' + file.name
					  document.body.appendChild(a)
					});
				});
				console.log('tor', tor);
				setupListeners(tor);
				tor.on('metadata', () => {
					setStatus('got metadata');
				});
				tor.on('infohash', () => {
					setStatus('getting torrent');
				});
				tor.on('wire', () => {
					setStatus('connected to a peer');
				});
				tor.on('download', () => {
					setStatus(`progress: ${tor.progress*100}%`);
				});
			}
		}

		if(!WebTorrent.WEBRTC_SUPPORT) {
			$('#nosupport').show();
			return;
		}

		$('#myfileinput').on('change', () => {
			// get files
			let files = $('#myfileinput')[0].files;
			// seed files
			client.seed(files, undefined, (torrent) => {
				console.log('torrent seeded', torrent, torrent.magnetURI);
				setupListeners(torrent);
				let magnet = torrent.magnetURI;

				let shareurl = `${location.host}${location.pathname}?share=${encodeURIComponent(magnet)}`;
				$('#sharelink').val(shareurl);

			});
			for(let f of files) {
				console.log(f.name);
			}
		});
	});
});