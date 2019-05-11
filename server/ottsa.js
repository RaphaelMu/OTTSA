var http = require('http')
var url = require('url')
var espeak = require('espeak')

var server = http.createServer(function(req, res) {
	reqData = url.parse(req.url, true)

	if (reqData.query.text) {		
		let text = reqData.query.text;

		//For some reason, this implementation cannot take -v french as an argument
		//but it works if we pass two arguments
		espeak.speak(text, ['-v', 'french'], function(err, wav) {
			if (err) return console.error(err);

			res.writeHead(200, { 'Content-Type': 'application/octet-stream' })
			
			//get a base64-encoded data URI
			var dataUri = wav.toDataUri();
			res.end(dataUri);
		});
	} else {
		res.writeHead(400);
		res.end('Wrong request');
	}
});
							   

server.listen(8080);
