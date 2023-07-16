export const mainTitle = '强哥无敌哦！'
export const TitleSub = ' - 强哥勇敢飞 上海永相随'
export const makeTitle = (title: string | null) => {
  if (!title) {
    return '一望无尽的空地上 伫立着一个李强'
  }
  return `${title}${TitleSub}`
}

export const makeTitleTag = (title: TemplateStringsArray) => {
  return makeTitle(title[0])
}
