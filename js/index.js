import _ from 'lodash';
// import WebTorrent from 'webtorrent';

window.client = new WebTorrent();
console.log(client);


let setupListeners = (torrent) => {
	_.map(['infoHash', 'metadata', 'ready', 'warning', 'error', 'wire', 'noPeers', 'download', 'upload'], (event) => {
		torrent.on(event, (arg) => {
			console.log(event, arg);
		});
	});
};

// try to get share url
let urlparams = location.href.split('?');
if(urlparams.length > 1) {
	urlparams = urlparams[1].split('&');
	urlparams = _.reduce(urlparams, (obj, p) => {
		let split = p.split('=');
		obj[split[0]] = split[1];
		return obj;
	}, {});
	if(urlparams.share) {
		let tor = client.add(decodeURIComponent(urlparams.share), undefined, (torrent) => {
			console.log('share torrent added!', torrent, torrent.path);
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
	}
}

$(() => {
	$('#myfileinput').on('change', () => {
		// get files
		let files = $('#myfileinput')[0].files;
		// seed files
		client.seed(files, undefined, (torrent) => {
			console.log('torrent seeded', torrent, torrent.magnetURI);
			let magnet = torrent.magnetURI;

			let shareurl = `${location.host}${location.pathname}?share=${encodeURIComponent(magnet)}`;
			$('#sharelink').val(shareurl);

		});
		for(let f of files) {
			console.log(f.name);
		}
	});
});