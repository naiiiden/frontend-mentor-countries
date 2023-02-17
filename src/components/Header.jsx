import { useEffect, useState } from "react";

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true" || false);

    useEffect(() => {
        isDarkMode ? document.body.classList.add("dark") : document.body.classList.remove("dark");
        localStorage.setItem("isDarkMode", isDarkMode);
    }, [isDarkMode]);

    return (
        <header>
            <h1>Where in the world?</h1>
            <button aria-label={isDarkMode ? "Activate light mode": "Activate dark mode"} onClick={() => setIsDarkMode(!isDarkMode)}>
                <svg viewBox="0 0 384 512" width="16" height="16" transform="rotate(-20)">
                    <path fill={isDarkMode ? "white" : "transparent"} stroke={isDarkMode ? "white" : "black"} strokeWidth="25" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
                </svg>
                {isDarkMode ? "Light mode" : "Dark mode"}
            </button>
        </header>
    )
}

export default Header;