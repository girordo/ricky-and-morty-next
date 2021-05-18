import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by
          <img src="/netlify.svg" alt="Netlify Logo" className="h-6 ml-2" />
        </a>
      </footer>
      <div>
        <p className="mx-2">
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
      </div>
    </>
  );
};

export default Footer;
