import type { AppProps } from "next/app";

// redux
import { wrapper } from "../src/store";

// i18n
import { appWithTranslation } from "next-i18next";

// styles
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(appWithTranslation(MyApp));
