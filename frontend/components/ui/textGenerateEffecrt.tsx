"use client";
import { motion } from "framer-motion";
import { cn } from "@/libs/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const wordsArray = words.split(" ");

  return (
    <div
      className={cn(
        "flex items-center justify-centerp-8",
        className
      )}
    >
      <div className="text-center text-black font-bold leading-snug tracking-wide">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className={`${idx > 3 ? "text-purple-400" : "text-black"} inline-block mr-2`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: idx * 0.2 }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
