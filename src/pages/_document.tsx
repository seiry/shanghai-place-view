import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html
        lang="zh"
        data-theme="cupcake"
        className="antialiased h-full relative"
      >
        <Head />
        <body className="overflow-x-hidden h-full relative">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
