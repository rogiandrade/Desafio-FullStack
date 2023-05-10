import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snorlax from "../../styles/assets/snorlax.png"

export function SignUpPage() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [error, setError] = useState('');
    const [sloading, setSloading] = useState(false)

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        fetch('http://localhost:2812/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, username, password })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.message === "User created successfully") {
                    setSloading(true)
                    navigate('/home');
                    setSloading(false)
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            });

        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setIsDisabled(true);
    }

    function handleChangeFirstName(event: { target: { value: string } }) {
        setFirstName(event.target.value);
    }
    
    function handleChangeLastName(event: { target: { value: string } }) {
        setLastName(event.target.value);
    }

    function handleChangeUsername(event: { target: { value: string; }; }) {
        setUsername(event.target.value.toLowerCase());
    }

    function handleChangePassword(event: { target: { value: string; }; }) {
        setPassword(event.target.value.toLowerCase());
    }

    useEffect(() => {
        if (password !== '' && username !== '' && lastName !== '' && firstName !== '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [firstName, lastName, username, password]);

    return (
        <div className="signup">
            <img
                className="logo"
                src="https://fontmeme.com/permalink/230504/99e8e7a63ec54356a7e02a6e6a74d7d5.png"
                alt="pokemon-font"
                width={200}
            />
            <section className="signupcard">
                <img className="snorlax" src={Snorlax} alt="Snorlax" />
                <div className="form">
                    <header>
                        <h1>Sign up</h1>
                        <a href={`http://127.0.0.1:5173/login`}>Login</a>
                    </header>
                    <form className="signupform" onSubmit={(e: any) => handleSubmit(e)}>
                        <div className="input-namecontainer">
                            <label>First name</label>
                            <input
                                className="names"
                                type="text"
                                value={firstName}
                                onChange={handleChangeFirstName}
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div className="input-namecontainer">
                            <label>Last name</label>
                            <input
                                className="names"
                                type="text"
                                value={lastName}
                                onChange={handleChangeLastName}
                                placeholder="Last name"
                                required
                            />
                        </div>
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
                        <button type="submit" disabled={isDisabled}>ENTER</button>
                    </form>
                </div>
            </section>
        </div>
    )
} 