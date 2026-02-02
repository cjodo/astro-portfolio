
const POST_API = import.meta.env.POST_API;

if (!POST_API) {
  throw new Error("POST_API is not defined");
}

export const getPost = async (ref: string) => {
  const res = await fetch(`${POST_API}/post/${ref}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed: ${res.status} ${text}`);
  }

  return res.text();
};

