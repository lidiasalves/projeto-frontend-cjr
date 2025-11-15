import "./globals.css";
import { League_Spartan } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Stockio",
  description: "Sistema de controle de estoque",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={leagueSpartan.className}>
        {children}

        {/* Toast global funcionando */}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
