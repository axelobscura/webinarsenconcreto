import React from "react";

const LoaderImcyc = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full bg-paper">
        <div className="flex items-end gap-4 mb-8" aria-hidden>
          <span className="block w-10 h-10 rounded-full bg-cobalt animate-bh-bounce" />
          <span className="block w-10 h-10 bg-mist bh-triangle animate-bh-bounce [animation-delay:150ms]" />
          <span className="block w-10 h-10 bg-navy animate-bh-bounce [animation-delay:300ms]" />
        </div>
        <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-ink">Cargando</h2>
    </div>
  );
};

export default LoaderImcyc;
