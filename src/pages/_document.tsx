import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh" data-theme="cupcake" className="antialiased">
        <Head />
        <body className="overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
