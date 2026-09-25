import React from "react";

const LoaderImcyc = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full bg-paper">
        <div className="flex gap-3 p-4 mb-8 rounded-md bg-ink" aria-hidden>
          {/* Semáforo de salida de F1: cinco luces azules que se encienden en secuencia */}
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="block w-8 h-8 rounded-full bg-gradient-to-r from-cobalt to-navy animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>
        <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-steel">Cargando</h2>
    </div>
  );
};

export default LoaderImcyc;
