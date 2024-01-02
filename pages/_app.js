import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Eventor</title>
        <meta
          name="description"
          content="All the best events for you to evolve ..."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 5000,
        }}
      />
    </Layout>
  );
}
