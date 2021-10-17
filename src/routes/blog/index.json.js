import posts from "./_posts.js";

const contents = posts.map((post) => {
  return {
    title: post.title,
    slug: post.slug,
    description: post.description ? post.description : "",
    excerpt: post.excerpt,
    printReadingTime: post.printReadingTime,
    date: post.date,
    tags: post.tags,
  };
});

let tags = new Set();
contents.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));

export function get(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({ posts: contents, tags: Array.from(tags) }));
}
