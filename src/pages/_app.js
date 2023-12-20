import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "next-themes";

export default function App({ Component, pageProps }) {

    return (
      <ThemeProvider attribute="class">
          <Component {...pageProps} />
          <ToastContainer />
      </ThemeProvider>
    )
}