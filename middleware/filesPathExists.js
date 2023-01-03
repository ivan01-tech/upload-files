
function filePathExist(req, res, next) {
	if (!req.files) return res.status(400).send({ status: "Error", message: "Missing files !" })
	next()
}

export default filePathExist
