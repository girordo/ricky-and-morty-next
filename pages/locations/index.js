import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
const defaultEndpoint = "https://rickandmortyapi.com/api/location";

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
        <section className="grid grid-cols-1 gap-2 p-20 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-4 xl:gap-6">
          {results.map(({ id, name, residents }) => (
            <Link key={id} href="/locations/[id]" as={`/locations/${id}`}>
              <section className="p-6 mt-6 text-left border rounded-xl hover:text-green-400">
                <h3 className="text-4xl font-bold">{name}</h3>
                <p className="mt-4 text-lg font-semibold">Residents:</p>
                <section className="grid grid-cols-4 gap-2">
                  {residents.map((resident, index) => (
                    <img
                      key={index}
                      src={`https://rickandmortyapi.com/api/character/avatar/${resident.match(
                        /\d+/g,
                      )}.jpeg`}
                      width="40%"
                      className="rounded-full"
                      alt={`Resident from ${name}`}
                    />
                  ))}
                </section>
              </section>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export default Locations;
