import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
const defaultEndpoint = "https://rickandmortyapi.com/api/character";

export async function getStaticProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const Characters = ({ data }) => {
  const { info, results: defaultResults = [] } = data;
  const [results, setResults] = useState(defaultResults);
  const [page, setPage] = useState({
    ...info,
    current: defaultEndpoint,
  });
  const onLoadMore = () => {
    setTimeout(() => {
      setPage((prev) => {
        return {
          ...prev,
          current: page?.next,
        };
      });
      setIsFetching(false);
    }, 2000);
  };
  const [isFetching, setIsFetching] = useInfiniteScroll(onLoadMore);

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

  useEffect(() => {
    if (current === defaultEndpoint) return;
    fetchData();
  }, [current]);

  return (
    <>
      <Head>
        <title>Rick and Morty API with Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="p-36 grid grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-6">
        {results.map(({ id, name, image, status, species, gender }) => (
          <Link key={id} href="/characters/[id]" as={`/characters/${id}`}>
            <section className="p-6 border rounded-xl hover:text-green-400 hover:border-green-400 focus:text-green-400 shadow-md transition-colors">
              <img
                src={image}
                className="rounded-2xl"
                alt="Character from Rick and Morty"
              />
              <h3 className="text-2xl mt-4 font-bold">{name}</h3>
              <p className="text-lg flex flex-row">
                Status: <p className="font-light">{status}</p>
              </p>
              <p className="text-lg flex flex-row">
                Race: <p className="font-light">{species}</p>
              </p>
              <p className="text-lg flex flex-row">
                Gender: <p className="font-light">{gender}</p>
              </p>
            </section>
          </Link>
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Characters;
