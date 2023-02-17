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
                {isDarkMode ? "Light mode" : "Dark mode"}
            </button>
        </header>
    )
}

export default Header;