import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ElevatorGame from "../components/game/ElevatorGame";
import GameComp from "../components/game/GameComp";
import GameComp2 from "../components/game/GameComp2";
import Header from "../components/game/Header";
import "./Login2.css";
import game from "../assets/game.png";

const Pages = styled.div`
  background-image: url(${game});
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
`;

const myProps = {
  title: "엘레베이터를 붙잡아!",
  number: 2,
};

export default function LoginPage2() {
  console.clear();

  /*
	Test run of creating animation library that accepts a custom easing function as an argument, and returns a repeatable animation bound to an element.
	
TODO:
1. debounce code so that animation doesn't run again before it's finished (if called more than once)
2. provide documentation on easing function (how to write one!)
3. automatically handle different, non-integer style properties - e.g. size which requires 'px' suffixes
*/

  let animateCustomEase = function (
    duration,
    easing,
    element,
    property,
    currentValue,
    toValue
  ) {
    let d = duration,
      ea = easing,
      e = element,
      p = property,
      fromV = currentValue,
      toV = toValue,
      lastStart = null,
      animate = function (timestamp) {
        debug++;
        // check if this is a new animation
        if (!lastStart) {
          console.log("setting last time stamp");
          lastStart = timestamp;
        }
        // check still in animation range
        if (timestamp - lastStart <= d) {
          // do animation
          e.style[property] = ea(timestamp - lastStart, 0, d, fromV, toV);
          // call next frame
          window.requestAnimationFrame(animate);
        }
      },
      debug = 0;
    return animate;
  };

  let Utils = {};

  Utils.modulate = function (val, fromMin, fromMax, toMin, toMax) {
    return toMin + ((val - fromMin) / (fromMax - fromMin)) * (toMax - toMin);
  };

  let flicker = function (
    progress,
    durationLow,
    durationHigh,
    valLow,
    valHigh
  ) {
    // get normalized progress value from 0 - 1
    let n = Utils.modulate(
      progress,
      durationLow,
      durationHigh,
      valLow,
      valHigh
    );
    let upperCap = (Math.random() * 7) / 10;
    if (n === !!n || n > upperCap) {
      return n;
    }
    var result = Math.abs(
      (0.25, n) * Math.sin((n - 0.13) * ((0.2 * Math.PI) / 0.4))
    );
    return result > 0 ? result : result * -1;
  };

  let element = document.querySelectorAll(".animateMe");

  let animateFlicker1 = animateCustomEase(
    4000,
    flicker,
    element[0],
    "opacity",
    0,
    1
  );
  let animateFlicker2 = animateCustomEase(
    4000,
    flicker,
    element[1],
    "opacity",
    0,
    1
  );
  let animateFlicker3 = animateCustomEase(
    4000,
    flicker,
    element[2],
    "opacity",
    0,
    1
  );
  let animateFlicker4 = animateCustomEase(
    4000,
    flicker,
    element[3],
    "opacity",
    0,
    1
  );

  window.requestAnimationFrame(animateFlicker1);
  window.requestAnimationFrame(animateFlicker2);
  window.requestAnimationFrame(animateFlicker3);
  window.requestAnimationFrame(animateFlicker4);

  document.querySelector(".sign").addEventListener("click", function animate() {
    element.forEach(function (el) {
      el.style.opacity = 0;
    });
    let animateFlicker1 = animateCustomEase(
      4000,
      flicker,
      element[0],
      "opacity",
      0,
      1
    );
    let animateFlicker2 = animateCustomEase(
      4000,
      flicker,
      element[1],
      "opacity",
      0,
      1
    );
    let animateFlicker3 = animateCustomEase(
      4000,
      flicker,
      element[2],
      "opacity",
      0,
      1
    );
    let animateFlicker4 = animateCustomEase(
      4000,
      flicker,
      element[3],
      "opacity",
      0,
      1
    );

    window.requestAnimationFrame(animateFlicker1);
    window.requestAnimationFrame(animateFlicker2);
    window.requestAnimationFrame(animateFlicker3);
    window.requestAnimationFrame(animateFlicker4);
  });
  return (
    <Pages>
      <div class="sign">
        <span class="animateMe">H</span>
        <span class="animateMe">E</span>
        <span class="animateMe">L</span>
        <span class="animateMe">P</span>
      </div>
      <div class="sign">
        <h1>Click the text to run animation again</h1>
      </div>
    </Pages>
  );
}
