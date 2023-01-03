function filesSizeLimitters(req, res, next) {
	// which stand for 5mb
	const MB = 5
	const FILE_SIZE = MB * 1024 * 1024 // en otect
	const unAllowedFiles = []

	// check for files that are to big
	Object.keys(req.files).forEach(function (key) {
		if (req.files[key].size > FILE_SIZE) {
			unAllowedFiles.push(req.files[key].name)
		}
	})

	if (unAllowedFiles.length > 0) {
		const proppverb = unAllowedFiles.length > 1 ? " are " : " is "
		const message = `${unAllowedFiles.join(",")}${proppverb} to big than the allowed ${MB} MB required !`
		return res.status(500).send({ status: "error", message })
	}

	next()
}
export default filesSizeLimitters