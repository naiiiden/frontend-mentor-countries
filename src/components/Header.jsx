import { useState } from "react";

const Header = () => {
    const [theme, setTheme] = useState(false);

    return (
        <header>
            <h1>Where in the world?</h1>
            <button aria-label={theme ? "Activate light mode": "Activate dark mode"} onClick={() => setTheme(!theme)}>
                {theme ? "Light mode" : "Dark mode"}
            </button>
        </header>
    )
}

export default Header;