import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@styles/globals.css";
import { Web3Provider } from "@components/providers/index";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <ToastContainer />
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp;
