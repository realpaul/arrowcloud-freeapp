var http = require('http'),
	logger = require('arrowcloud-logger')();

http.createServer(function(req, res) {
	var startTime = new Date().getTime();
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('Welcome to Node.ACS!');
	// On local side, console logs will be output normally
	// On cloud side, any console output will be saved into Arrow Cloud, and you can use "$acs logcat" or "$acs loglist" to retrieve them
	console.log('This is log from console. ' + startTime);
	console.error('This is error from console. ' + startTime);
	// Require node module "arrowcloud-logger" to take advantage of Arrow Cloud Logger
	// On local side, logs from Arrow Cloud Logger will be saved into ./logs/app.log
	// On cloud side, logs from Arrow Cloud Logger will be saved into Arrow Cloud, and you can use "$acs logcat" or "$acs loglist" to retrieve them
	// It is recommended to use logger in your app since it can control output log level by either logger.setLevel() or environment variable "logLevel"
	logger.setLevel('DEBUG');
	logger.debug('This is debug to logger. ' + startTime);
	logger.error('This is error to logger. ' + startTime);
	var processTime = new Date().getTime() - startTime;
	// Arrow Cloud Logger provides another feature to track your http/https service access, and you can use "$acs accesslog" to retrieve them,
	// after activating and using logger.logAccess() to log access information
	logger.logAccess(req, processTime);
}).listen(process.env.PORT || 8080);
