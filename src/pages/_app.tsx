"use client";

import "@/assets/css/globals.css";
import type { AppProps } from "next/app";
import Loader from "@/components/Loader";
import store, { persistor } from "@/store";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Sidebar from "@/components/global/Sidebar";
import CheckoutBar from "@/components/CheckoutBar";
import ThemesProvider from "@/components/global/ThemesProvider";

import { Router } from "next/router";
import { Provider } from "react-redux";
import { Exo_2 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";

const exo = Exo_2({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemesProvider>
          <main className={exo.className}>
            <Navbar />
            <Sidebar />
            <Toaster />
            {loading && <Loader />}
            <Component {...pageProps} />
            <CheckoutBar />
            <Footer />
          </main>
        </ThemesProvider>
      </PersistGate>
    </Provider>
  );
}
