import Head from "next/head";
import React from "react";
import fs from "fs";
import path from "path";
// using the graymatter module to parse
// the content of each article
import matter from "gray-matter";
import Blog from "../src/container/Blog";
import Layout from "../src/layout";

export default function Home({ posts }) {
  return (
    <React.Fragment>
      <Layout>
        <Blog articles={posts} />
      </Layout>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  // obtain blog posts from the "/posts" directory
  const files = fs.readdirSync(path.join("articles"));

  // getting the frontmatter/blog post excerpt from
  // the posts directory in each file
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    // obtaining the frontmatter
    // it is the excerpt of tha article/blog post, that'll contain
    // the title of the article, the author's name,
    // the date it was published and so on.
    const articlePreview = fs.readFileSync(
      path.join("articles", filename),
      "utf-8"
    );

    // destructuring graymatter by assigning 'frontmatter'
    // to the 'data' key
    const { data: frontmatter } = matter(articlePreview);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
