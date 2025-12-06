
import Header from '@/components/header/header';
import BodyHome from "@/components/body/bodyHome";
import NavbarLogada from '@/components/header/navbar';
import ModalEditarLoja from '@/components/modal/modalEditarLoja';


export default function Home() {
  return (
    <main className = "overflow-x-hidden">
      <NavbarLogada/>
      <Header />
      <BodyHome /> 
    </main>
  );
}
