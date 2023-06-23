import React, { useEffect } from "react";
import styled from "styled-components";
import game from "../assets/game.png";
import desk from "../assets/game_typo/desk.png";
import "./Login3.css";

export default function LoginPage3() {
  useEffect(() => {
    // Make sure to tag your Pen 'cpc-timeline' and 'codepenchallenge' so that we can all see it!

    // eslint-disable-next-line no-undef
    $("li").wrapInner("<div></div>");

    // Check to see if Mario should be facing forwards or backwards based on scroll direction
    // var position = $(window).scrollTop();
    // $(window).scroll(function () {
    //   var scroll = $(window).scrollTop();
    //   if (scroll > position) {
    //     $("#mario").removeClass("backwards");
    //   } else {
    //     $("#mario").addClass("backwards");
    //   }
    //   position = scroll;
    // });

    // const sections = gsap.utils.toArray("li");
    let maxWidth = 0;

    const getMaxWidth = () => {
      maxWidth = 0;
      //   sections.forEach((section) => {
      //     maxWidth += section.offsetWidth;
      //   });
    };
    getMaxWidth();
    // ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

    // gsap.to(sections, {
    //   x: () => `-${maxWidth - window.innerWidth}`,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: ".timeline",
    //     pin: true,
    //     scrub: 1,
    //     end: () => `+=${maxWidth}`,
    //     invalidateOnRefresh: true,
    //   },
    // });

    // ScrollTrigger.addEventListener("scrollStart", () =>
    //   $("#mario").addClass("run")
    // );

    // ScrollTrigger.addEventListener("scrollEnd", () =>
    //   $("#mario").removeClass("run")
    // );
  }, []);

  return (
    <div>
      <div id="title">
        <span className="square one"></span>
        <span className="square two"></span>
        <h1>SUPER MARIO BROS. Timeline</h1>
        <p>Initial launch dates of games in the Super Mario series. </p>
        <span className="square three"></span>
        <span className="square four"></span>
      </div>
      <div id="mario"></div>
    </div>
  );
}
