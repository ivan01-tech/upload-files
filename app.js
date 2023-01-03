import express from "express"
import { join } from "node:path"
import fileupload from "express-fileupload"

import allowedExtension from "./middleware/allowedExtension.js"
import filePathExist from "./middleware/filesPathExists.js"
import filesSizeLimitters from "./middleware/fileSizeLimitters.js"

const PORT = process.env.PORT || 3000
const app = express()

app.get("/", function (req, res) {
	res.sendFile(join(process.cwd(), "index.html"))
})

app.post("/upload",
	fileupload({ createParentPath: true }),
	filePathExist,
	filesSizeLimitters,
	allowedExtension([".jpg", ".png", ".jpeg"]),
	function (req, res) {

		Object.keys(req.files).forEach(function (key) {
			const pathFile = join(process.cwd(), "files", req.files[key].name)
			req.files[key].mv(pathFile, function (err) {
				if (err) return res.status(500).send({ status: "Error", message: "Something went wrong !" })
			})
		})

		return res.send({ sucess: "Success", message: `${Object.keys(req.files).join(" , ")}` })

	})


app.listen(PORT, function () { console.log("Server running on port : ", PORT) })