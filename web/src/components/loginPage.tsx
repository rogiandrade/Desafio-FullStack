import { useEffect, useState } from "react";
import Pikachu from "../styles/assets/pikachu.png"

export function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        setUsername('');
        setPassword('');
        setIsDisabled(true);
    }

    function handleChangeUsername(event: { target: { value: string; }; }) {
        setUsername(event.target.value.toLowerCase());
    }

    function handleChangePassword(event: { target: { value: string; }; }) {
        setPassword(event.target.value.toLowerCase());
    }

    useEffect(() => {
        if (password !== '' && username !== '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [username, password]);

    return (
        <div className="login">
            <img
                className="logo"
                src="https://fontmeme.com/permalink/230504/99e8e7a63ec54356a7e02a6e6a74d7d5.png"
                alt="pokemon-font"
                width={200} /><section className="logincard">
                <img className="pikachu" src={Pikachu} alt="Pikachu" />
                <div className="form">
                    <h1>Login</h1>
                    <form onSubmit={(e: any) => handleSubmit(e)}>
                        <div className="input-container">
                            <label>Username </label>
                            <input type="text" value={username} onChange={handleChangeUsername} placeholder="@username" required />
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" value={password} onChange={handleChangePassword} placeholder="********" required />
                        </div>
                        <button type="submit" disabled={isDisabled}>ENTER</button>
                    </form>
                </div>
            </section>
        </div>
    )
}