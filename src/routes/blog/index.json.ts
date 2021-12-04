import readingTime from 'reading-time';
import emoji from 'node-emoji';
import path from 'path';

export async function get() {
	const modules = import.meta.glob('./**/*.md');

	const posts = [];

	await Promise.all(
		Object.entries(modules).map(async ([name, module]) => {
			let result = await module();
			const fileName = path.basename(name);
			const replacer = (match) => emoji.emojify(match);
			let content = result.default.render().html.replace(/(:.*:)/g, replacer);
			const readingStats = readingTime(content, { wordsPerMinute: 150 });
			const printReadingTime = readingStats.text;
			posts.push({
				...result.metadata,
				slug: fileName.replace('.md', ''),
				printReadingTime
			});
		})
	);

	const contents = posts.map((post) => {
		return {
			title: post.title,
			slug: post.slug,
			description: post.description ? post.description : '',
			excerpt: post.excerpt,
			printReadingTime: post.printReadingTime,
			date: post.date
				? new Date(post.date).toLocaleDateString('en-EN', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
				  })
				: null,
			tags: post.tags
				? post.tags.split(',').map(function (item) {
						return item.trim();
				  })
				: []
		};
	});

	let tags = new Set();
	contents.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));

	return {
		body: JSON.stringify({ posts: contents, tags: Array.from(tags) })
	};
}
