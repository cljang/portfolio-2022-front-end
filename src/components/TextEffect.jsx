// Implement Text Effect Animation based on Tobias Ahlin's Moving Letters Animation #10 - Domino Dreams
// https://tobiasahlin.com/moving-letters/#10

import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.min.js";

function TextEffect({text}) {

  // Reference to the Text Effect element
  const thisEffect = useRef(null);

  // Anime.js object
  const animation = useRef(null);

  useEffect(() => {
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animation.current = anime.timeline({
            loop: false,
          })

          // Start from hidden to visible
          animation.current.add({
            targets: entry.target,
            opacity: 1,
            delay: 0,
          })

          // Animate in characters
          animation.current.add({
            targets: entry.target.querySelectorAll(".letter"),
            rotateY: [-90, 0],
            rotateZ: [10, 0],
            duration: 1000,
            delay: (el, i) => 10 * i
          })

          // Stop observing this target
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(thisEffect.current);

  },[])


  return (
    <span className="text-effect" ref={thisEffect}>
      <span className="text-wrapper">
        {text.split("").map((letter, id) => {
          return(
            <span className={`letter ${letter === " " ? "space": ""}`} key={id}>{letter}</span>
          )
        })}
      </span>
    </span>
  )
}

TextEffect.defaultProps = {
  text: "",
}

export default TextEffect