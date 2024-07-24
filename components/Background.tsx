"use client";

import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

function Background() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="">
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            move: {
              direction: "none",
              enable: true,
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 50,
            },
            opacity: {
              value: 0.6,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        init={particlesInit}
      />

      <div className="grain" />

      <div data-poster-url="/bg.mp4" data-autoplay={true} data-loop={true} data-wf-ignore={true} className="-z-20 w-full h-full filter blur-2xl object-cover block fixed top-0 bottom-0 left-0 right-0">
        <video id="d6f1d52f-9da1-65ea-b5e0-5b1d28bbc683-video" className="w-full h-full object-cover z-[-100] bg-[50%] bg-cover m-auto absolute -top-full -bottom-full -left-full -right-full" autoPlay loop style={{ backgroundImage: "url('/bg.mp4')" }} muted playsInline>
          <source src="/0723.mp4" data-wf-ignore={true} />
          <source src="/bg.webm" data-wf-ignore={true} />
        </video>
      </div>
    </div>
  );
}

export default Background;
