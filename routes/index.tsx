import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../types.d.ts";
import { listPost } from "../utils/post.ts";

export const handler: Handlers = {
  async GET(req, context) {
    const posts = await listPost();
    return context.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { data } = props;
  const { posts } = data;
  return (
    <main class="p-4 grid gap-4">
      <h1 class="text-4xl font-bold">My blog</h1>
      {posts.map((post: Post) => (
        <article>
          <h2 class="text-2xl font-bold">
            <a
              class="hover:text-blue-500 "
              href={`/blog/${post.title}`}
            >
              {post.title}
            </a>
          </h2>
          <time>{Intl.DateTimeFormat("en").format(post.date)}</time>
        </article>
      ))}
    </main>
  );
}
