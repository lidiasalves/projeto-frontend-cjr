
import Header from '@/components/header/header';
import BodyHome from "@/components/body/bodyHome";
import Navbar from '@/components/header/navbar';


export default function Home() {
  return (
    <main className = "overflow-x-hidden">
      <Navbar/>
      <Header />
      <BodyHome /> 
    </main>
  );
}
