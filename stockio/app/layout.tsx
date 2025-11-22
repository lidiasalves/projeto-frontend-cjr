import "./globals.css";
import { League_Spartan } from "next/font/google";


const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata = {
  title: "Stockio",
  description: "Sistema de controle de estoque",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={leagueSpartan.className}>{children}</body>
    </html>
  );
}