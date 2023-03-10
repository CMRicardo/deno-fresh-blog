import { extract } from "$std/encoding/front_matter/any.ts";
import { render } from "https://deno.land/x/gfm@0.1.26/mod.ts";
import { Post } from "../types.d.ts";

export async function loadPost(id: string): Promise<Post | null> {
  const raw = await Deno
    .readTextFile(`./content/posts/${id}.md`)
    .catch(() => null);

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;

  const post: Post = {
    id,
    title: params.title,
    body: render(body),
    date: new Date(params.date),
    excerpt: params.excerpt,
  };

  return post;
}

export async function listPost(): Promise<Post[]> {
  const { readDir } = Deno;
  const promises = [];

  for await (const entry of readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    if (id) promises.push(loadPost(id));
  }

  const posts = await Promise.all(promises) as Post[];

  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime(); // DESC
  });

  return posts;
}

export async function listPostSequantially(): Promise<Post[]> {
  const posts: Post[] = [];
  const { readDir } = Deno;

  for await (const entry of readDir("./content/posts")) {
    const { name } = entry;
    const [id] = name.split(".");
    const post = await loadPost(id);
    if (!post) continue;
    posts.push(post);
  }

  return posts;
}
