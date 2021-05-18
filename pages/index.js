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

const Home = ({ data }) => {
  const { info, results: defaultResults = [] } = data;
  const [results, setResults] = useState(defaultResults);
  const [page, setPage] = useState({
    ...info,
    current: defaultEndpoint,
  });

  const { current } = page;

  const fetchData = async () => {
    const res = await fetch(current);
    const nextData = await res.json();

    setPage({
      current,
      ...nextData.info,
    });

    if (!nextData.info?.prev) {
      setResults(nextData.results);
      return;
    }

    setResults((prev) => {
      return [...prev, ...nextData.results];
    });
  };

  const onLoadMore = () => {
    setPage((prev) => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  };

  useEffect(() => {
    if (current === defaultEndpoint) return;
    fetchData();
  }, [current]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Rick and Morty API with Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center mb-10">
        <h1 className="text-6xl font-bold">
          Mais um caso de estudo com
          <a className="ml-4 text-green-400" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {results.map(({ id, name, image, status, species, gender }) => (
            <Link key={id} href="/character/[id]" as={`/character/${id}`}>
              <a className="p-6 mt-6 text-left border rounded-xl hover:text-green-400 hover:border-green-400 focus:text-green-400 shadow-md">
                <img
                  src={image}
                  className="rounded-2xl mr-10"
                  alt="Character from Rick and Morty"
                />
                <h3 className="text-2xl mt-4 font-bold">{name}</h3>
                <p className="mt-4 text-lg">{status}</p>
                <p className="text-lg">{species}</p>
                <p className="text-lg">{gender}</p>
              </a>
            </Link>
          ))}
        </div>
        <button
          className="mt-10 mb-10 p-4 bg-green-400 rounded-md shadow-lg text-center text-white"
          onClick={onLoadMore}>
          Carregar mais
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
