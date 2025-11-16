import { useEffect } from "react";

export default function useScrollRestore(key) {
    useEffect(() => {
        const saved = sessionStorage.getItem(`scroll-${key}`);
        if (saved !== null) {
            window.scrollTo(0, parseInt(saved));
        }
    }, [key]);

    useEffect(() => {
        const save = () => {
            sessionStorage.setItem(`scroll-${key}`, window.scrollY);
        };

        window.addEventListener("scroll", save);

        return () => {
            save();
            window.removeEventListener("scroll", save);
        };
    }, [key]);
}
