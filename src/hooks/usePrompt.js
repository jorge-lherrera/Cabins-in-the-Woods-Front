import { useEffect } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { useContext } from "react";

export function usePrompt(when, onBlock) {
  const navigator = useContext(NavigationContext)?.navigator;

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;

    navigator.push = (...args) => {
      if (onBlock()) {
        push.apply(navigator, args);
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [when, onBlock, navigator]);
}
