import React from "react";
import Image from "next/image";

const LoaderConcreton = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <Image
          src={`/loader.svg`}
          alt="IMCYC"
          width={40}
          height={0}
          layout="intrinsic"
          className="animate-[spin_2s_linear_infinite]"
        />
    </div>
  );
};

export default LoaderConcreton;
