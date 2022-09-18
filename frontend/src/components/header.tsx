import Head from 'next/head'

export default function HeadInfo() {
  return (
    <Head>
      <title>Marketplace</title>
      <meta name="description" content="Aplicación de marketplace para profesores particulares" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}