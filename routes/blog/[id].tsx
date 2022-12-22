import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "../../utils/Post.ts";
import { CSS } from "https://deno.land/x/gfm@0.1.26/mod.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post = await loadPost(id);
    return context.render({ post });
  },
};

export default function PostPage(props: PageProps) {
  const { post } = props?.data || {};

  return (
    <article class="p-4">
      <h1 class="text-2xl font-bold">{post.title}</h1>
      <time class="text-sm">
        {Intl.DateTimeFormat("en-us").format(post.date)}
      </time>
      <style dangerouslySetInnerHTML={{ __html: CSS }}></style>
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      >
        {post.body}
      </div>
    </article>
  );
}
