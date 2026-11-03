import { afterEach, expect, it, vi } from "vitest";
import { initializeRevealAnimations } from "../../js/reveal-animations.js";

afterEach(() => vi.unstubAllGlobals());

it("keeps content visible if the animation observer fails", () => {
  const element = { classList: { add: vi.fn(), remove: vi.fn() } };
  const disconnect = vi.fn();
  class FailingObserver {
    observe() { throw new Error("Observer unavailable"); }
    disconnect = disconnect;
  }
  vi.stubGlobal("window", { IntersectionObserver: FailingObserver, matchMedia: () => ({ matches: false }) });
  vi.stubGlobal("IntersectionObserver", FailingObserver);
  vi.stubGlobal("document", { querySelectorAll: () => [element] });

  initializeRevealAnimations();

  expect(element.classList.remove).toHaveBeenCalledWith("reveal-pending");
  expect(disconnect).toHaveBeenCalledOnce();
});
