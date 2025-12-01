import Header from './home/components/header/header';
import BodyHome from "./home/components/body/bodyHome";
// import NavbarLogada from './home/components/header/navbarlogada';
import NavbarDeslogada from './home/components/header/navbardeslogada';

export default function Home() {
  return (
    <>
      <NavbarDeslogada/>
      <Header />
      <BodyHome /> 
    </>);
}
