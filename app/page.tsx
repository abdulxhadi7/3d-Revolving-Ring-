"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function RevolvingCards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const cards = [
    {
      title: "Creative Design",
      desc: "Crafting visuals that leave an impression.",
      gradient: "from-violet-500 to-indigo-600",
    },
    {
      title: "Smooth Animation",
      desc: "Every motion feels alive and natural.",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      title: "Performance Focus",
      desc: "Optimized experiences that run buttery smooth.",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      title: "Premium UI",
      desc: "Interfaces that feel luxury and elegant.",
      gradient: "from-amber-400 to-orange-600",
    },
    {
      title: "Modern Tech",
      desc: "Built using React, Framer Motion, and Tailwind.",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      title: "Next-level Interactivity",
      desc: "Interactions that surprise and delight.",
      gradient: "from-fuchsia-500 to-purple-600",
    },
  ];

  return (
    <div className="flex justify-end items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 pr-24">
      <div className="relative flex items-center gap-20">
        {/* Expanded Card */}
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className={`h-[24rem] w-[22rem] bg-gradient-to-br ${
              cards[activeIndex].gradient
            } rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] 
                       flex flex-col justify-center items-start text-white p-8`}
          >
            <h2 className="text-3xl font-semibold mb-3">
              {cards[activeIndex].title}
            </h2>
            <p className="opacity-90 text-base max-w-[80%] leading-relaxed">
              {cards[activeIndex].desc}
            </p>
          </motion.div>
        )}

        {/* Revolving Ring */}
        <motion.div
          className="relative w-[28rem] h-[28rem]"
          animate={
            activeIndex === null
              ? { rotate: 360 }
              : { rotate: 0 }
          }
          transition={{
            repeat: activeIndex === null ? Infinity : 0,
            duration: 15,
            ease: "linear",
          }}
        >
          {cards.map((card, i) => {
            const angle = (i * 360) / cards.length;
            const radius = 170;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                animate={{
                  scale: isActive ? 1.3 : 1,
                  zIndex: isActive ? 20 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className={`absolute w-24 h-24 rounded-2xl cursor-pointer 
                            bg-gradient-to-br ${card.gradient} 
                            shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                            flex items-center justify-center text-white font-medium`}
                style={{
                  top: `calc(50% + ${y}px - 3rem)`,
                  left: `calc(50% + ${x}px - 3rem)`,
                }}
              >
                {card.title.split(" ")[0]}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
