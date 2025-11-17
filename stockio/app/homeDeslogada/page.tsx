
import Header from '@/components/header/header';
import BodyHome from "@/components/body/bodyHome";
import NavbarDeslogada from '@/components/header/navbardeslogada';


export default function Home() {
  return (
    <main className = "overflow-x-hidden">
      <NavbarDeslogada/>
      <Header />
      <BodyHome /> 
    </main>
  );
}
