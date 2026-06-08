import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, url = "https://mobiprocleaning.com.ua" }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:site_name' content='MobiPro Cleaning' />
    </Helmet>
  );
}
