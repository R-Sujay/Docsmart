"use client";

import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // animate(
    //   "button",
    //   {
    //     clipPath: isOpen ? "inset(0% 0% 0% 0% round 10px)" : "inset(10% 50% 90% 50% round 10px)",
    //   },
    //   {
    //     type: "spring",
    //     bounce: 0,
    //     duration: 0.5,
    //   }
    // );

    // animate(
    //   "ul",
    //   {
    //     clipPath: isOpen ? "inset(0% 0% 0% 0% round 10px)" : "inset(10% 50% 90% 50% round 10px)",
    //   },
    //   {
    //     type: "spring",
    //     bounce: 0,
    //     duration: 0.5,
    //   }
    // );

    animate(".buttonCom", !isOpen ? { width: 130, height: 60 } : { width: 1500, height: 800 }, {
      duration: 0.3,
      type: "spring",
    });
  }, [isOpen]);

  return scope;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center" ref={scope}>
      <motion.div onClick={() => setIsOpen(true)} whileTap={{ scale: !isOpen ? 0.8 : 1 }} className="buttonCom shadow-xl relative flex justify-center items-center bg-gradient text-2xl cursor-pointer text-white">
        {isOpen && (
          <>
            <div className="curve -top-[10%] rounded-b-[100%] " />
            <div className="curve -bottom-[10%] rounded-t-[100%]" />
          </>
        )}
        {/* Click Me! */}
      </motion.div>
      {/* <div className="border-2 border-gray-500 p-2 rounded-3xl min-h-[50vh] w-2/3 bg-gray-100">k</div> */}
    </main>
  );
}
