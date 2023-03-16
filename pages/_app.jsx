import "../styles/globals.css";
// import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import Login from './login';
import { useCookies } from "react-cookie";
import { useAtom } from "jotai";
import { authorizationAtom } from "helpers/authorize";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [cookie, setCookie] = useCookies(["x-access-token"]);
  const [authorized, _] = useAtom(authorizationAtom);
  const router = useRouter();

  useEffect(() => {
    if (!authorized) {
      router.push('/login');
    }
  }, []);


  return (
    <Layout>

      <Component {...pageProps} />


    </Layout>
  );
}

export default MyApp;
