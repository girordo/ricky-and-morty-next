import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="flex-col  w-full h-24 border-t">
        <a
          className="my-6 flex items-center justify-center"
          href="https://netlify.com"
          target="_blank"
          rel="noopener noreferrer">
          Powered by
          <img src="/netlify.svg" alt="Netlify Logo" className="h-6 ml-2" />
        </a>
        <div className="m-2 flex items-center justify-center">
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
        </div>
      </footer>
    </>
  );
};

export default Footer;
