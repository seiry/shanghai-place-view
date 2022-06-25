export const mainTitle = '板板博客哦！'
export const TitleSub = ' - 板板'
export const makeTitle = (title: string | null) => {
  if (!title) {
    return '一望无尽的空地上 伫立着一个板板'
  }
  return `${title}${TitleSub}`
}

export const makeTitleTag = (title: TemplateStringsArray) => {
  return makeTitle(title[0])
}
