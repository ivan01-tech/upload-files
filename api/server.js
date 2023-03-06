const http = require("node:http")
const fs = require("node:fs")
const path = require("node:path")
const PORT = process.env.PORT || 3500

const app = http.createServer(async function (req, res) {

	try {

		res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
		res.setHeader('Access-Control-Allow-Headers', ['file-name', "content-length", "Content-Type"]);
		res.setHeader('Access-Control-Allow-Methods', 'POST');
		res.setHeader('Content-Type', 'application/json')

		const url = new URL(req.url, `http://${req.headers.host}`)
		const endpoint = `${req.method}:${url.pathname}`
		console.log(endpoint);
		switch (endpoint) {
			case "POST:/upload":

				let contentLength = parseInt(req.headers['content-length'])

				if (isNaN(contentLength) || contentLength <= 0) {
					response.statusCode = 411;
					response.end(JSON.stringify({ status: "error", description: "No File" }))
					return
				}

				console.log("contentLength : ", contentLength);
				console.log("contentType : ", req.headers);
				let filename = req.headers["file-name"]
				if (filename == null) {
					filename = "file." + req.headers["content-type"]?.split("/")[1]
				}
				console.log("Filename : ", filename);

				const dirpath = path.join(__dirname, "files")
				const filepath = path.join(__dirname, "files", filename)
				if (!fs.existsSync(dirpath)) {
					fs.mkdirSync(dirpath)
				}

				const filesStream = fs.createWriteStream(filepath)

				filesStream.on("error", (error) => {
					console.error(error)
					response.statusCode = 400;
					response.write(JSON.stringify({ status: "error", description: error }))
					response.end()
					return
				})

				req.pipe(filesStream)

				req.on('end', () => {
					filesStream.close(() => {
						res.end(JSON.stringify({ status: "success" }))
						return
					})
				})
				return
			default:
				res.end(JSON.stringify({ status: "Hello world" }))
				return
		}

	} catch (err) {
		res.statusCode = 500
		res.end(JSON.stringify({ status: "error", description: err }))
		throw err
	}
})

app.listen(PORT, function () {
	console.log("Server is running on port : ", PORT);
})