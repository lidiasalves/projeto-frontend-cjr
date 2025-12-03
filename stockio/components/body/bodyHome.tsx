import BarraPesquisa from "./barraPesquisa";
import Categoria from "./carrosselCategorias";
import CarrosselLojas from "./store/carrosselLojas";
import CarrosselProdutos from "./store/produtcs/carrosselProdutos";

const BodyHome = () => {

    return (
        <main className = "bg-auto min-h-screen w-full px-4 sm:px-6 md:px-8 py-12">
            
            <BarraPesquisa/>
            <div className = "mt-12">
                <Categoria/>
            </div>
            <CarrosselProdutos/>
            <CarrosselProdutos />
            <CarrosselProdutos />
            <CarrosselLojas/>
        </main>
        
    )
}

export default BodyHome;