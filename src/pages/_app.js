import '../../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
          {/* <Navbar /> */}
          <div>
            <Component {...pageProps} />
          </div>
    </div>
  );
}

export default MyApp;
