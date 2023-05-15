import * as Avatar from '@radix-ui/react-avatar';
import UserPhoto from '../../styles/assets/userphoto.png'
import { useEffect, useState } from 'react';

export function Home() {

    const [username, setUsername] = useState('');

    const userAvatar = () => (
        <Avatar.Root >
            <Avatar.Image src={UserPhoto} />
            <Avatar.Fallback />
        </Avatar.Root>
        );

        useEffect(() => {
            async function getUsername() {
                const response = await fetch(`http://localhost:2812/users?id=${userId}`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const data = await response.json();
                setUsername(data.username);
              }
              getUsername();
          }, []);

    return (
        <div className="home">
            <header className='headerHome'>
                <div className="navbar">
                    <img
                        className="logo"
                        src="https://fontmeme.com/permalink/230504/99e8e7a63ec54356a7e02a6e6a74d7d5.png"
                        alt="pokemon-font"
                        width={200}
                    />
                    <ul>
                        <li>Home</li>
                        <li>Pokelist</li>
                        <li>Pokedex</li>
                        <li>Battle Pass</li>
                    </ul>
                </div>
                <div className='user'>
                    <div>{username}</div>
                    {userAvatar()}
                </div>
            </header>
        </div>
    )
}