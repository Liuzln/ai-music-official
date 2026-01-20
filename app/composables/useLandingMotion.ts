export const useLandingMotion = () => {
  const easeOut = [0.22, 1, 0.36, 1] as const
  const liftSpring = { type: 'spring', stiffness: 230, damping: 20, mass: 0.9 } as const

  const fadeUpInitial = { opacity: 0, y: 34, scale: 0.98, filter: 'blur(18px)' }
  const fadeUpEnter = (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.95, delay, ease: easeOut },
  })
  const fadeUpVisible = (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.95, delay, ease: easeOut },
  })

  const cardInitial = { opacity: 0, y: 36, scale: 0.96, filter: 'blur(18px)' }
  const cardEnter = (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      opacity: { duration: 0.9, delay, ease: easeOut },
      filter: { duration: 0.9, delay, ease: easeOut },
      y: { ...liftSpring, delay },
      scale: { ...liftSpring, delay },
    },
  })
  const cardVisibleOnce = (index = 0) => {
    const delay = index * 0.06
    return {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        opacity: { duration: 0.9, delay, ease: easeOut },
        filter: { duration: 0.9, delay, ease: easeOut },
        y: { ...liftSpring, delay },
        scale: { ...liftSpring, delay },
      },
    }
  }
  const cardHovered = { y: -6, scale: 1.01, transition: { ...liftSpring } }

  const staggerDelay = (index: number, base = 0, step = 0.06) => base + index * step

  const microStaggerBase = 0.42
  const microStaggerStep = 0.06
  const microStaggerStepTight = 0.045

  const microInitial = { opacity: 0, y: 22, filter: 'blur(12px)' }
  const microVisibleOnce = (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      opacity: { duration: 0.75, delay, ease: easeOut },
      filter: { duration: 0.75, delay, ease: easeOut },
      y: { ...liftSpring, delay },
    },
  })

  const microPopInitial = { opacity: 0, y: 24, scale: 0.92, filter: 'blur(12px)' }
  const microPopVisibleOnce = (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      opacity: { duration: 0.75, delay, ease: easeOut },
      filter: { duration: 0.75, delay, ease: easeOut },
      y: { ...liftSpring, delay },
      scale: { ...liftSpring, delay },
    },
  })

  return {
    fadeUpInitial,
    fadeUpEnter,
    fadeUpVisible,
    cardInitial,
    cardEnter,
    cardVisibleOnce,
    cardHovered,
    staggerDelay,
    microStaggerBase,
    microStaggerStep,
    microStaggerStepTight,
    microInitial,
    microVisibleOnce,
    microPopInitial,
    microPopVisibleOnce,
  }
}

