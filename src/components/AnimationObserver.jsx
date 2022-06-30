import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.min.js";

function AnimationObserver() {
  // Create an empty array of refs for IntersectionObserver
  const refs = useRef([]);

  // Anime.js object
  const animation = useRef(null);

  useEffect(() => {
    refs.current = [];
    
    // Add all refs with the target class to the refs array
    const targetElements = document.querySelectorAll(`.animate`);
    targetElements.forEach((element, index) => {
      refs.current[index] = element;
    })

    const options = {
      threshold: 0.3,
      rootMargin: "0px 0px 16px 0px",
    }
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          animation.current = anime.timeline({
            loop: false,
          })
          
          // Add desired animations
          animation.current.add({
            targets: entry.target,
            opacity: [0, 1],
            translateY: ["20rem", 0],
            duration: 1500,
            easing: 'easeOutElastic(1, 0.8)',
          })
          
          observer.unobserve(entry.target);
        }
      });
    }, options)


    // Observe All Refs
    refs.current.forEach(ref => {
      observer.observe(ref);
    })

  }, [])

  return (null)
}

export default AnimationObserver