import { Html, Head, Main, NextScript } from "next/document";

const env = process.env.NODE_ENV;

const Document = () => (
  <Html lang="en">
    {env === "development" && <script src="http://localhost:8097" />}
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
