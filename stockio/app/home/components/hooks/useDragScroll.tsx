// hooks/useDragScroll.ts
import { useRef, useState } from "react";

/**
 * Hook customizado para adicionar efeito de drag-scroll em qualquer container horizontal.
 * Retorna o `ref` que deve ser adicionado no container e os handlers de eventos.
 */
export function useDragScroll() {
  const carrosselRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Quando o usuário pressiona o mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = carrosselRef.current;
    if (!slider) return;

    setIsDragging(true);
    slider.classList.add("cursor-grabbing");

    // Posição inicial do clique
    setStartX(e.pageX - slider.offsetLeft);

    // Posição atual do scroll
    setScrollLeft(slider.scrollLeft);
  };

  // Quando o mouse sai do carrossel
  const handleMouseLeave = () => {
    setIsDragging(false);
    carrosselRef.current?.classList.remove("cursor-grabbing");
  };

  // Quando o botão é solto
  const handleMouseUp = () => {
    setIsDragging(false);
    carrosselRef.current?.classList.remove("cursor-grabbing");
  };

  // Quando o mouse se move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Evita seleção de imagem/texto

    const slider = carrosselRef.current;
    if (!slider) return;

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // Velocidade do scroll

    slider.scrollLeft = scrollLeft - walk;
  };

  return {
    carrosselRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  };
}
