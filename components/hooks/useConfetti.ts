import confetti from "canvas-confetti";

const useConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  const fire = (
    particleRatio: number,
    opts: {
      spread: number;
      startVelocity?: number;
      decay?: number;
      scalar?: number;
      angle?: number;
      origin?: { x?: number; y?: number };
      colors?: string[];
    },
  ) => {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  };

  const fireConfetti = () => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      angle: 120,
      origin: { x: 0.98, y: 0.98 },
      colors: ["#ffffff"],
    });

    fire(0.2, {
      spread: 60,
      angle: 120,
      origin: { x: 0.98, y: 0.98 },
      colors: ["#ffffff"],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      angle: 120,
      origin: { x: 0.98, y: 0.98 },
      colors: ["#2463eb"],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      angle: 120,
      origin: { x: 0.98, y: 0.98 },
      colors: ["#2463eb"],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      angle: 120,
      origin: { x: 0.98, y: 0.98 },
      colors: ["#2463eb"],
    });
  };

  fireConfetti();
};

export default useConfetti;
