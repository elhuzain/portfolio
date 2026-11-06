// Import only what you use: esbuild bundles these and drops everything else.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DISTANCE = 24; // px each element travels while fading
const ENTER = { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" };
const LEAVE = { autoAlpha: 0, y: -DISTANCE, duration: 0.35, ease: "power2.in" };

const main = document.querySelector("main");

// Top-level blocks (return button, header, paragraphs, nav) animate as units.
// Containers holding project cards don't; their cards animate one by one instead.
const blocks = main ? [...main.children].filter((el) => !el.querySelector("article")) : [];
const cardContainers = main ? [...main.children].filter((el) => el.querySelector("article")) : [];
const cards = gsap.utils.toArray("main article");

const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
};

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
    let leaving = false;

    function enter() {
        leaving = false;
        gsap.set(cardContainers, { autoAlpha: 1, y: 0 });
        gsap.fromTo(blocks, { autoAlpha: 0, y: DISTANCE }, { ...ENTER, stagger: 0.06 });

        if (!cards.length) return;
        gsap.set(cards, { autoAlpha: 0, y: DISTANCE });

        // Cards fade in from the bottom as they scroll into view; the first
        // visible ones wait briefly so they follow the page header.
        let first = true;
        ScrollTrigger.batch(cards, {
            start: "top 95%",
            once: true,
            onEnter: (batch) => {
                gsap.to(batch, { ...ENTER, stagger: 0.08, delay: first ? 0.2 : 0 });
                first = false;
            },
        });
    }

    function leave(href) {
        leaving = true;
        ScrollTrigger.getAll().forEach((t) => t.kill());

        // Only animate what the visitor can see; off-screen elements don't matter.
        const visible = [...blocks, ...cards].filter(inViewport);
        gsap.to(visible, {
            ...LEAVE,
            stagger: 0.04,
            onComplete: () => window.location.assign(href),
        });
    }

    function onClick(e) {
        const link = e.target.closest("a[href]");
        if (!link || e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new tab/window
        if (link.target && link.target !== "_self") return;
        if (link.hasAttribute("download")) return;

        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return; // external links behave normally
        if (url.pathname === window.location.pathname && url.hash) return; // in-page anchors

        e.preventDefault();
        if (!leaving) leave(url.href);
    }

    // Coming back with the browser's back button can restore this page from
    // cache with everything still faded out, so play the enter animation again.
    function onPageShow(e) {
        if (e.persisted) {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            enter();
        }
    }

    enter();
    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onPageShow);

    // Runs if reduced motion gets turned on: gsap.matchMedia reverts the
    // animations, and this removes the listeners.
    return () => {
        document.removeEventListener("click", onClick);
        window.removeEventListener("pageshow", onPageShow);
    };
});
