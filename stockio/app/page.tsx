import Header from '@/components/header/header';
import BodyHome from "@/components/body/bodyHome";
// import NavbarLogada from './home/components/header/navbarlogada';
import NavbarDeslogada from '@/components/header/navbardeslogada';

export default function Home() {
  return (
    <>
      <NavbarDeslogada/>
      <Header />
      <BodyHome /> 
    </>);
}
