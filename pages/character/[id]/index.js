import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Head from "next/head";

const Character = ({ name, image, species, gender, status }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Rick and Morty API with Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center mb-10">
        <h1 className="text-6xl font-bold">{name}</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Character;
