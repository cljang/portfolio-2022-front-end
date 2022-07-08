import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.min.js";

function AnimationObserver({children, id}) {

  const animRef = useRef();

  // Create an empty array of refs for IntersectionObserver
  const refs = useRef([]);

  // Anime.js object
  const animation = useRef(null);

  // When id changes, reset all the previously animated elements
  useEffect(() => {
    const targetElements = animRef.current.querySelectorAll(`.animated`);
    targetElements.forEach((element) => {
      element.classList.remove("animated")
      element.classList.add("animate")
    })
  }, [id])

  useEffect(() => {
    refs.current = [];
    
    // Add all refs with the target class to the refs array
    const targetElements = animRef.current.querySelectorAll(`.animate`);
    targetElements.forEach((element, index) => {
      refs.current[index] = element;
      element.style = {};
    })

    const options = {
      rootMargin: "0px 0px -100px",
    }
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          let classes = [...entry.target.classList];
          // Translate direction
          let translateX = 0;
          if (classes.includes('fade-in-left')) {
            translateX = ["10rem", 0];
          } else if (classes.includes('fade-in-right')) {
            translateX = ["-10rem", 0];
          }

          let translateY = 0;
          if (classes.includes('fade-in-up')) {
            translateY = ["10rem", 0];
          } else if (classes.includes('fade-in-down')) {
            translateY = ["-10rem", 0];
          }

          // Animation Duration
          let duration = 1500;
          let durationClass = classes.find((className) => /^animation-duration-[0-9]*$/.test(className));
          if (durationClass) {
            duration = parseInt(durationClass.split('animation-duration-')[1]);
          }

          // Animation delay
          let delay = 0;
          let delayClass = classes.find((className) => /^animation-delay-[0-9]*$/.test(className));
          if (delayClass) {
            delay = parseInt(delayClass.split('animation-delay-')[1]);
          }

          animation.current = anime.timeline({
            loop: false,
          })
          
          // Add desired animations
          animation.current.add({
            targets: entry.target,
            opacity: [0, 1],
            translateX: translateX,
            translateY: translateY,
            duration: duration,
            delay: delay,
            easing: 'easeOutElastic(1, 0.8)',
          })

          entry.target.classList.remove("animate")
          entry.target.classList.add("animated")
          observer.unobserve(entry.target);
        }
      });
    }, options)


    // Observe All Refs
    refs.current.forEach(ref => {
      observer.observe(ref);
    })

  }, [children])

  return (
    <div ref={animRef} className="animation-observer">
      {children}
    </div>
  )
}

export default AnimationObserver