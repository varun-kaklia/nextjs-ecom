import { Inter } from "next/font/google";
import "../styles/globals.css";
import { RecoilProvider } from "@/utils/RecoilProvider";
import NavBar from "@/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS- Ecommerce",
  description: "It's just an Ecom web app created in Next and Tailwind.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProvider>
          <NavBar />
          <main className="lg:p-6 md:p-4 sm:p-3 p-1">
            {children}
          </main>
        </RecoilProvider>
      </body>
    </html>
  );
}
