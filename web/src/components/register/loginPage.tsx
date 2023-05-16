import { useEffect, useState } from "react";
import Pikachu from "../../styles/assets/pikachu.png"
import { useNavigate } from "react-router-dom";
import { Loading } from "../alternatives/loading";

export function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage] = useState('');
    const [sloading, setSloading] = useState(false)

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        fetch('http://localhost:2812/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.message === 'User logged in successfully') {
                const token = data.token;
          
                // Armazene o token no localStorage
                localStorage.setItem('token', token);
                setSloading(true)
                navigate('/home');
                setSloading(false);
            }
        })
            .catch((error) => console.error(error));

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
                width={200} />
            <section className="logincard">
                <img className="pikachu" src={Pikachu} alt="Pikachu" />
                <div className="form">
                    <header>
                        <h1>Login</h1>
                        <a href={`http://127.0.0.1:5173/siginup`}>Sign up</a>
                    </header>
                    <form onSubmit={(e: any) => handleSubmit(e)}>
                        <div className="input-container">
                            <label>Username </label>
                            <input
                                type="text"
                                value={username}
                                onChange={handleChangeUsername}
                                placeholder="@username"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input
                                type="password"
                                value={password}
                                onChange={handleChangePassword}
                                placeholder="********"
                                required
                            />
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <button type="submit" disabled={isDisabled}>ENTER</button>
                    </form>
                </div>
            </section>
            <div>
                {sloading && <Loading />}
            </div>
        </div>
    )
}
