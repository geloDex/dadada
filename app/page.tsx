"use client"

import { useState, useEffect, useRef } from "react"
import { Cake, Gift, Heart, Star, PartyPopper, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useWindowSize } from "react-use"
import Confetti from "./components/Confetti"

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const [wishesVisible, setWishesVisible] = useState(Array(6).fill(false))
  const [countdown, setCountdown] = useState(10)
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showGiftMessage, setShowGiftMessage] = useState(false)
  const [isBirthdayMessageVisible, setIsBirthdayMessageVisible] = useState(true) // Added state
  const videoRef = useRef<HTMLIFrameElement>(null)

  const toggleWish = (index: number) => {
    setWishesVisible((prev) => {
      const newState = [...prev]
      newState[index] = !newState[index]
      return newState
    })
  }

  const toggleParty = () => {
    setShowConfetti(true)
    setIsPlaying(!isPlaying)

    // Control YouTube video
    if (videoRef.current?.contentWindow) {
      const command = isPlaying ? "pauseVideo" : "playVideo"
      videoRef.current.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, "*")
    }
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setShowBirthdayMessage(true)
      setShowConfetti(true)
    }
  }, [countdown])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 flex flex-col">
      {/* Hidden YouTube embed */}
      <div className="hidden">
        <iframe
          ref={videoRef}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/nl62hhiBMOM?enablejsapi=1&controls=0"
          title="Happy Birthday Song"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          className="w-0 h-0"
        />
      </div>

      {showConfetti && <Confetti />}
      <header className="bg-pink-300 p-4 text-center relative overflow-hidden">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-800 font-cursive relative z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Happy Birthday, Lorene Justine D. Yuzon!
        </motion.h1>
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Sparkles
              key={i}
              className="text-yellow-400 absolute animate-sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </motion.div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <AnimatePresence>
          {showBirthdayMessage &&
            isBirthdayMessageVisible && ( // Updated AnimatePresence
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="fixed inset-0 flex items-center justify-center z-50"
              >
                <div className="bg-pink-500 text-white text-4xl sm:text-5xl md:text-6xl font-bold p-4 sm:p-6 md:p-8 rounded-lg shadow-lg relative">
                  <button
                    onClick={() => setIsBirthdayMessageVisible(false)}
                    className="absolute -top-2 -right-2 bg-white text-pink-500 rounded-full p-1 text-sm shadow-lg hover:bg-pink-100 transition-colors"
                  >
                    ✕
                  </button>
                  HAPPY BIRTHDAY!
                </div>
              </motion.div>
            )}
        </AnimatePresence>
        <AnimatePresence>
          {showGiftMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={() => setShowGiftMessage(false)}
            >
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
                <p className="text-lg sm:text-xl font-semibold text-pink-600 mb-4">
                  Ang utang ko 100 next time ko na bayadan
                </p>
                <p className="text-xl sm:text-2xl font-bold text-pink-800">HAPPY BIRTHDAY LJ!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-pink-600 mb-4 flex items-center justify-center">
            <Cake className="mr-2" /> It's Your Special Day! <Cake className="ml-2" />
          </h2>
          <p className="text-base sm:text-lg text-pink-700 text-center mb-6">
            Today is all about you, your birthday girl! Let's make it magical and unforgettable!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-pink-500 hover:bg-pink-600 w-full sm:w-auto" onClick={toggleParty}>
              <PartyPopper className="mr-2" /> {isPlaying ? "Stop" : "Start"} the Party!
            </Button>
            <Button
              variant="outline"
              className="border-pink-500 text-pink-500 hover:bg-pink-100 w-full sm:w-auto"
              onClick={() => setShowGiftMessage(true)}
            >
              <Gift className="mr-2" /> Open Gifts
            </Button>
          </div>
          {countdown > 0 && (
            <p className="text-center mt-4 text-xl sm:text-2xl font-bold text-pink-600">Countdown: {countdown}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="bg-pink-200 rounded-lg p-4 sm:p-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-pink-700 mb-4 flex items-center">
              <Star className="mr-2" /> Birthday Wishes
            </h3>
            <ul className="space-y-4">
              {[
                "Lots of love and warm hugs",
                "Endless smiles and joyful laughter",
                "Wonderful surprises at every turn",
                "Unforgettable moments with friends",
                "A year filled with dreams come true",
              ].map((wish, index) => (
                <motion.li
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleWish(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`mr-2 ${wishesVisible[index] ? "text-red-500" : "text-pink-500"}`} />
                  <span
                    className={`text-sm sm:text-base ${wishesVisible[index] ? "text-red-700 font-bold" : "text-pink-700"}`}
                  >
                    {wish}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="bg-pink-200 rounded-lg p-4 sm:p-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-pink-700 mb-4">Photo Gallery</h3>
            <div className="grid grid-cols-2 gap-4">
  {[1, 2, 3, 4].map((i) => (
    <motion.div
      key={i}
      className="bg-white p-2 rounded-lg shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={`/assets/birthday-photo-${i}.jpg`} // Load images from the assets folder
        alt={`Birthday Photo ${i}`}
        className="w-full h-auto rounded"
      />
    </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-pink-300 p-4 text-center text-pink-800 text-sm sm:text-base">
        <p>&copy; {new Date().getFullYear()} Advantage ng merong tropa na BSIT (Angelo)</p>
      </footer>
    </div>
  )
}

