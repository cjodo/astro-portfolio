const POST_API = import.meta.env.POST_API

export const getPost = async (ref: string) => {
	const res = await fetch(`${POST_API}/post/${ref}`, {
		cache: "force-cache"
	});

	if (!res.ok) throw new Error("Content not found")
	return res.text()
}
