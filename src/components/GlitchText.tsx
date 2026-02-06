import { useEffect, useRef } from "react";

type AnimationType = "text" | "logo" | "text-subtle";

type GlitchTextProps = {
  element?: keyof JSX.IntrinsicElements;
  className?: string;
  animationType?: AnimationType;
  children: React.ReactNode;
};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const GlitchText = ({
  element = "div",
  className = "",
  animationType = "text",
  children,
}: GlitchTextProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animationClass =
      animationType === "logo"
        ? "glitch-animate-logo"
        : animationType === "text-subtle"
          ? "glitch-animate-text-subtle"
          : "glitch-animate-text";

    const scrambleText = (target: HTMLElement, finalText: string, duration = 2000) => {
      const textLength = finalText.length;
      let frame = 0;
      const totalFrames = Math.max(1, Math.floor(duration / 50));

      const intervalId = window.setInterval(() => {
        frame += 1;
        const progress = frame / totalFrames;
        const revealIndex = Math.floor(progress * textLength);

        let scrambledText = "";
        for (let i = 0; i < textLength; i += 1) {
          const char = finalText[i];
          if (i < revealIndex) {
            scrambledText += char;
          } else if (char === " ") {
            scrambledText += " ";
          } else if (char === "<" || char === ">") {
            scrambledText += char;
          } else {
            scrambledText += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        target.textContent = scrambledText;

        if (frame >= totalFrames) {
          window.clearInterval(intervalId);
          target.textContent = finalText;
        }
      }, 50);

      return intervalId;
    };

    el.classList.remove("glitch-fallback");
    el.classList.add(animationClass);

    let scrambleInterval: number | null = null;
    let restoreTimeout: number | null = null;

    if (animationType === "text" || animationType === "text-subtle") {
      const textElement = (el.querySelector("span") || el) as HTMLElement;
      const originalHTML = textElement.innerHTML;
      const originalText = textElement.textContent || "";
      const scrambleDuration = animationType === "text-subtle" ? 600 : 1500;

      scrambleInterval = scrambleText(textElement, originalText, scrambleDuration);
      restoreTimeout = window.setTimeout(() => {
        textElement.innerHTML = originalHTML;
      }, scrambleDuration);
    }

    const cleanupDuration = animationType === "text-subtle" ? 1500 : 2500;
    const cleanupTimeout = window.setTimeout(() => {
      el.classList.remove(animationClass);
    }, cleanupDuration);

    return () => {
      if (scrambleInterval !== null) {
        window.clearInterval(scrambleInterval);
      }
      if (restoreTimeout !== null) {
        window.clearTimeout(restoreTimeout);
      }
      window.clearTimeout(cleanupTimeout);
    };
  }, [animationType]);

  const Element = element;

  return (
    <Element ref={ref} className={`${className} glitch-fallback`} data-glitch-type={animationType}>
      {children}
    </Element>
  );
};

export default GlitchText;
