"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useWindowSize } from "react-use"

const colors = ["#ffc0cb", "#ff69b4", "#ff1493", "#c71585", "#db7093"]

const Confetti = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([])
  const { width, height } = useWindowSize()

  useEffect(() => {
    const particleCount = Math.floor((width * height) / 10000) // Adjust particle count based on screen size
    const newParticles = []
    for (let i = 0; i < particleCount; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: "-10%",
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      }
      newParticles.push(
        <motion.div
          key={i}
          className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"
          style={style}
          animate={{
            top: "110%",
            rotate: 360 * Math.random(),
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />,
      )
    }
    setParticles(newParticles)
  }, [width, height])

  return <div className="fixed inset-0 pointer-events-none">{particles}</div>
}

export default Confetti

