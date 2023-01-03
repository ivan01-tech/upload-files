import { extname } from "node:path"

function allowedExtension(allowedExt) {

	return function (req, res, next) {

		const filesExt = Object.keys(req.files).map(key => extname(req.files[key].name))
		const allowed = filesExt.every(ext => allowedExt.includes(ext))

		if (!allowed) {
			// 422 unproccessable entity
			return res.status(422).send({ status: "Error", message: `Upload failed : only ${allowedExt.join(" ")}` })
		}

		next()
	}
}

export default allowedExtension