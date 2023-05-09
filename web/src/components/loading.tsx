import { useLayoutEffect } from "react";
import Pokeball from "../styles/assets/pokeball.svg"

{/* this function makes the application loading animation */}
export function Loading() {

    useLayoutEffect(() => {
        const loader = document.getElementById("loader")!;
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 10000000);
    }, []);


    return (
        <>
            <div className="root"></div>
            <div id="loader">
                <img className="loading" src={Pokeball} alt="Pokeball" />
            </div>
        </>
    )
}