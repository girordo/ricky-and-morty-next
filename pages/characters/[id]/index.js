import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import dayjs from "dayjs";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

const Character = () => {
  const router = useRouter();
  const { id } = router.query;
  const [characterData, setCharacterData] = useState({});

  const fetchData = async () => {
    const res = await fetch(`${defaultEndpoint}/${id}`);
    const data = await res.json();
    setCharacterData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{characterData.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-col justify-center flex-1 px-20 mb-10">
        <article className="card w-96 mx-auto bg-white shadow-xl hover:shadow">
          <img
            className="w-64 mx-auto rounded-full -mt-20 border-8 border-gray-200"
            src={characterData.image}
            alt="Character Data"
          />
          <h2 className="text-center mt-2 text-3xl font-medium">
            {characterData.name}
          </h2>
          <section className="px-6 text-center mt-2 font-light text-sm">
            <div className="flex flex-col ml-8">
              <ul className="text-left">
                <li>
                  <h4>Status: {characterData.status}</h4>
                </li>
                <li>
                  <h4>Species: {characterData.species}</h4>
                </li>
                <li>
                  <h4>Gender: {characterData.gender}</h4>
                </li>
                <li>
                  <Link key={id} href="/character/[id]" as={`/character/${id}`}>
                    <h4>Location: {characterData.location?.name}</h4>
                  </Link>
                </li>
                <li>
                  <h4>Origin: {characterData.origin?.name}</h4>
                </li>
              </ul>
            </div>
          </section>
          <hr className="mt-8" />
          <section className="flex flex-row justify-center p-4">
            <span className="font-bold">Created:</span>
            {dayjs(characterData.created).format("DD/MM/YYYY")}
          </section>
        </article>
      </main>
      <Footer />
    </section>
  );
};

export default Character;
