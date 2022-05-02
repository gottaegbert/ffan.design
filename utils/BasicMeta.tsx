import Head from "next/head";
import config from "./config";

type Props = {
  title?: string;
  description?: string;
  keywords?: string[];
  url: string;
};
export default function BasicMeta({
  title,
  description,
  keywords,
  url,
}: Props) {
  return (
    <Head>
      <title>
        {title ? [title, config.site_title].join(" | ") : config.site_title}
      </title>
      <meta
        name="description"
        content={description ? description : config.site_description}
      />
      <meta
        name="keywords"
        content={
          keywords
            ? keywords.join(",")
            : config.site_keywords.map((it) => it).join(",")
        }
      />
      <meta name="author" content={config.site_title} />

      <link rel="canonical" href={config.base_url + url} />
      <link rel="shortcut icon" href="/favicon.svg" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link rel="manifest" href="/site.webmanifest" /> */}
      <meta name="theme-color" content="#fffffff" />

      <meta property="og:title" content={config.site_title} />
      {/* <meta property="og:image" content="/images/sharePic.png" /> */}
      <meta property="og:description" content="Portfolio" />
      <meta property="og:url" content={config.base_url} />
    </Head>
  );
}
