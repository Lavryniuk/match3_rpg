import { useState, useRef } from "react";

export function useAnimationsFSM(setGamePhase, setIsResolving, setHintCells) {
  const animationOwnerRef = useRef(null);
  const resolveAnimationsRef = useRef(0);
  const hintAnimationsRef = useRef(0);

  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  function onAnimationStart() {
    const owner = animationOwnerRef.current;

    if (owner === "resolving") {
      resolveAnimationsRef.current += 1;
    }

    if (owner === "hint") {
      hintAnimationsRef.current += 1;
    }

    setGamePhase("animating");
  }

  function onAnimationEnd() {
    const owner = animationOwnerRef.current;

    if (owner === "resolving") {
      resolveAnimationsRef.current -= 1;
    }

    if (owner === "hint") {
      hintAnimationsRef.current -= 1;
    }

    if (resolveAnimationsRef.current > 0 || hintAnimationsRef.current > 0)
      return;

    resolveAnimationsRef.current = 0;
    hintAnimationsRef.current = 0;

    if (owner === "finished") {
      setIsResolving(false);
      setGamePhase("finished");
      animationOwnerRef.current = null;
      return;
    }

    if (owner === "resolving") {
      animationOwnerRef.current = "hint";
      setIsResolving(false);
      setGamePhase("hinted");
      return;
    }

    if (owner === "hint") {
      animationOwnerRef.current = null;
      setGamePhase("idle");
    }
  }

  function interruptHint() {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    setGamePhase("action");

    if (animationOwnerRef.current === "hint") {
      animationOwnerRef.current = null;
      hintAnimationsRef.current = 0;
      setHintCells(null);
    }

    animationOwnerRef.current = "resolving";
  }

  function setOwner(owner) {
    animationOwnerRef.current = owner;
  }

  return {
    onAnimationStart,
    onAnimationEnd,
    interruptHint,
    setOwner,
    hasUserInteracted,
  };
}
