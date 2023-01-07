import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body
          style={{
            margin: 0,
            padding: 0,
            height: '100vh',
            boxSizing: 'border-box',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
