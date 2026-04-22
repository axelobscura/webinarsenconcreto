import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center w-full bg-slate-950">
        <Image
          src={`/loader.svg`}
          alt="IMCYC"
          width={100}
          height={0}
          layout="intrinsic"
          className="mb-3 animate-[spin_2s_linear_infinite]"
        />
        <h2 className="text-2xl font-light text-white uppercase font-montserrat">Cargando</h2>
    </div>
  );
};

export default Loader;
