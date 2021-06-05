// https://github.com/mvasigh/sveltekit-mdsvex-blog/blob/4cde064ece/src/lib/util.js
const slugRegex = /([\w-]+)\.(svelte\.mdx|md|svx)/i

export async function getAllPosts(globArr) {
  const postPromises = []

  for (let [path, resolver] of Object.entries(globArr)) {
    const match = path.match(slugRegex)
    if (!match || !match[1]) continue

    const slug = match[1]

    const promise = resolver().then(post => [
      slug,
      {
        ...post.metadata,
        date: new Date(post.metadata.date),
      },
    ])
    postPromises.push(promise)
  }

  return Promise.all(postPromises)
}

export function fromEntries(entries) {
  return entries.reduce((acc, [key, val]) => {
    acc[key] = val
    return acc
  }, {})
}
