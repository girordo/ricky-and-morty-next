import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Head from "next/head";

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

  const { location } = characterData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{characterData.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center flex-1 px-20 mb-10">
        <div className="flex flex-row">
          <img
            src={characterData.image}
            alt="Character Data"
            className="rounded-lg"
          />
          <div className="flex flex-col ml-8">
            <ul>
              <li>
                <h1 className="text-6xl font-bold mb-8">
                  {characterData.name}
                </h1>
              </li>
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
                <h4>Location: {location.name}</h4>
              </li>
              <li>
                <h4>
                  Created: {dayjs(characterData.created).format("DD/MM/YYYY")}
                </h4>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Character;
