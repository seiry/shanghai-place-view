import { marked } from 'marked'

export const markedStr = (md?: string | null): string => {
  if (!md) {
    return ''
  }
  const html = marked.parse(md, {})
  return html
}
