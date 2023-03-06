const file = document.querySelector("#file")
const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click", async function (e) {

	e.preventDefault()

	if (!file.files.length || !file.files[0]) {
		// TODO handle error
		console.log("break");
		return
	}

	const theFile = file.files[0]
	const filename = Math.floor(Math.random() * 1000) + theFile.name

	try {
		console.log("Start : ");
		const response = await fetch("http://localhost:3500/upload", {
			method: "POST",
			mode: "cors",
			headers: {
				"file-name": filename,
			},
			body: theFile,
		})
		const i = await response.json()
		console.log("contetn  : ", i);
	} catch (err) {
		console.log(err);
	}
})
