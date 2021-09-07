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

const Locations = ({ data }) => {
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
        <title>Localizações</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center flex-1">
        <section className="grid grid-cols-1 gap-2 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-4 xl:gap-6">
          {results.map(({ id, name, image }) => (
            <Link key={id} href="/locations/[id]" as={`/characters/${id}`}>
              <section>
                <img
                  src={image}
                  className="rounded-2xl mr-10"
                  alt="Location from Ricky and Morty"
                />
                <h3 className="text-4xl font-bold">{name}</h3>
              </section>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export default Locations;
