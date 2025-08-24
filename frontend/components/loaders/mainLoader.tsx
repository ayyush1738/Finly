import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from '@/components/ui/textGenerateEffecrt';

export default function MainLoader() {
    return (
        <div className="flex flex-col h-full items-center justify-center bg-gradient-to-r from-green-400 to-indigo-900">
            <motion.div
                className="relative flex items-center justify-center p-20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <DotLottieReact
                    src="https://lottie.host/1a088b01-06f8-45e3-a4aa-19e45a75e77c/UiYtIC0jbP.lottie"
                    loop
                    autoplay
                    style={{
                        width: "600px",
                        height: "600px",
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2 }}
                    className="absolute top-[40%] left-[70%] transform -translate-x-1/2"
                >
                    <div className="flex flex-col">
                        <div className="inline-flex w-40 items-center space-x-2 bg-gray-800 rounded-full px-4 py-2 text-sm font-medium text-white">
                            Oh, I love this dress!
                        </div>
                        <div className="w-4 h-4 right-[50%] rounded-full bg-gray-800"></div>
                        <div className="w-3 h-3 m-2 rounded-full bg-gray-800"></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 4 }}
                    className="absolute top-[50%] left-[78%] transform -translate-x-1/2"
                >
                    <div className="flex flex-col">
                        <div className="inline-flex ml-8 w-auto items-center space-x-2 bg-gray-800 rounded-full px-4 py-2 text-sm font-medium text-white">
                            And it's on sale!
                        </div>
                        <div className="w-4 h-4 ml-4 right-[50%] rounded-full bg-gray-800"></div>
                        <div className="w-3 h-3 m-2 rounded-full bg-gray-800"></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 6 }}
                    className="absolute top-[55%] left-[40%] transform -translate-x-1/2"
                >
                    <div className="flex flex-col items-start">
                        <div className="inline-flex ml-8 w-auto items-center space-x-2 bg-gray-800 rounded-full px-4 py-2 text-sm font-medium text-white">
                            Can i afford it?
                        </div>
                        <div className="ml-40 w-4 h-4 rounded-full bg-gray-800"></div>
                        <div className="ml-44 w-3 h-3 mt-1 rounded-full bg-gray-800"></div>
                    </div>
                </motion.div>

            </motion.div>

            <motion.div
                className="absolute flex items-center justify-center p-20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 7 }}
            >
                <TextGenerateEffect
                    className="text-black text-8xl bg-transparent"
                    words="Let's Find Out"
                />
            </motion.div>
        </div>
    );
}
