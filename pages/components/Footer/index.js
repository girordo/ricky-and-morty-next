import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center w-full h-24 border-t">
      <section className="flex flex-col items-center">
        <img
          src="/images/rick-and-morty-logo.png"
          width="10%"
          alt="Ricky and Morty logo"
          className="block"
        />
        <section className="flex">
          <p>
            Made with
            <span aria-label="Heart Purple Emoji" role="img" className="mx-2">
              💜
            </span>
            by
          </p>
          <a
            className="flex-col mx-2"
            href="https://github.com/girordo"
            target="_blank"
            rel="noreferrer">
            /girordo
          </a>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
