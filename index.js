const http = require("http");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));

const port = Number(args.port);

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let mainScript = "";

fs.readFile("home.html", (err, home) => {
	if (err) {
		throw err;
	}
	homeContent = home;
});

fs.readFile("project.html", (err, project) => {
	if (err) {
		throw err;
	}
	projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
	if (err) {
		throw err;
	}
	registrationContent = registration;
});

fs.readFile("main.js", (err, script) => {
	if (err) {
		throw err;
	}
	mainScript = script;
});

http.createServer((request, response) => {
	const url = request.url;
	response.writeHead(200, { "Content-Type": "text/html" });
	switch (url) {
		case "/project":
			response.write(projectContent);
			response.end();
			break;
		case "/registration":
			response.write(registrationContent);
			response.end();
			break;
		case "/main.js":
			response.writeHead(200, { "Content-Type": "text/script" });
			response.write(mainScript);
			response.end();
			break;
		default:
			response.write(homeContent);
			response.end();
			break;
	}
}).listen(port, () => {
	console.log(`Server runnng at port ${port}`);
});
