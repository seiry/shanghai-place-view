import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import prisma from './prisma'
import { markedStr } from './marked'
import { htmlToText } from 'html-to-text'
const postsDirectory = path.join(process.cwd(), 'posts')

export const PureTextFromHtml = {
  selectors: [
    { selector: 'img', format: 'skip' },
    {
      selector: 'a',
      options: {
        ignoreHref: true,
        noAnchorUrl: true,
      },
    },
    { selector: 'ul', options: { itemPrefix: ' ' } },
  ],
}
export interface PostData {
  id: string
  date?: string
  title?: string
}
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a?.date! < b?.date!) {
      return 1
    } else {
      return -1
    }
  })
}

const filter = {
  all: {
    select: {
      cid: true,
      slug: true,
    },
    where: {
      status: 'publish',
      password: null,
      type: 'post',
    },
  },
}

export const getAllPostUrl = async () => {
  const allPosts = await prisma.contents.findMany({
    select: {
      cid: true,
      slug: true,
    },
    where: filter.all.where,
  })
  const slugs = allPosts.map((e) => `${e.slug}`)
  return slugs
}

export const getAPostBySlug = async (slug: string) => {
  const post = await prisma.contents.findUnique({
    where: {
      slug,
    },
    include: {
      user: {
        select: {
          screenName: true,
          uid: true,
        },
      },
    },
  })
  if (!post) {
    return null
  }
  post.text = markedStr(post.text)
  return post
}

export const getPostsNumber = async () => {
  const count = await prisma.contents.count({
    where: filter.all.where,
  })
  return count
}
export const getPostsPages = async () => {
  const length = await getPostsNumber()
  const pages = Math.ceil(length / pageSize)
  return pages
}

export const pageSize = 2

export const getPostsByPage = async (pageId: number) => {
  const posts = await prisma.contents.findMany({
    include: {
      fields: true,
      relationship: {
        include: {
          meta: true,
        },
      },
      user: {
        select: {
          screenName: true,
          uid: true,
        },
      },
    },
    skip: (pageId - 1) * pageSize,
    take: pageSize,
  })
  posts.forEach((post) => {
    post.text = htmlToText(markedStr(post.text), PureTextFromHtml)
      .substring(0, 1000)
      .replace(/\n/g, ' ')
  })
  return posts
}
