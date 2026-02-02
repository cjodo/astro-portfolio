const POST_API = import.meta.env.POST_API

export const getPost = async (ref: string) => {
	console.log(POST_API)
	const res = await fetch(`${POST_API}/post/${ref}`, {
		cache: "no-store"
	});

	console.log({ res })

	if (!res.ok) throw new Error("Content not found")
	return res.text()
}
