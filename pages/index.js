import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
const defaultEndpoint = "https://rickandmortyapi.com/api/character";

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Rick and Morty API with Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center mb-10">
        <h1 className="text-6xl font-bold mb-10">
          Mais um caso de estudo com
          <a
            className="ml-4 text-green-400 hover:text-green-800 transition-colors"
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer">
            Next.js!
          </a>
        </h1>
        <Link href="/characters">
          <h1 className="text-2xl font-bold hover:text-green-400 transition-colors">
            Veja aqui os personagens
          </h1>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
