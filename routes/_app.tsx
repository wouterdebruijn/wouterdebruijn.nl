import { type PageProps } from "$fresh/server.ts";
import PlausibleLoader from "../islands/PlausibleLoader.tsx";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Wouter de Bruijn" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Teko&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class="font-teko">
        <PlausibleLoader />
        <Component />
      </body>
    </html>
  );
}
