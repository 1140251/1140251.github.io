import posts from "../_posts.js";

const lookup = new Map();

const tags = new Set();
posts.forEach((post) => {
  lookup.set(post.slug, post);
  if (post.tags) {
    post.tags.forEach((tag) => tags.add(tag));
  }
});

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  if (lookup.has(slug)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    const post = lookup.get(slug);
    const recent = Array.from(lookup.values());
    res.end(
      JSON.stringify({
        post,
        recent: recent.slice(0, 3),
        tags: Array.from(tags),
      })
    );
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}
