import { loadPost } from "./Post.ts";
import { assertEquals } from "$std/testing/asserts.ts";

const { test } = Deno;

test(
  "loadPost() returns null if file is not found",
  async () => {
    const post = await loadPost("Non-existent");
    assertEquals(post, null);
  },
);

test(
  "loadPost() returns a post object if post does exists",
  async () => {
    const post = await loadPost("Hello");
    assertEquals(post?.id, "Hello");
    assertEquals(post?.title, "Hello world!!!");
  },
);
