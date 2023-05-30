import * as Avatar from '@radix-ui/react-avatar';
import UserPhoto from '../../styles/assets/userphoto.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';
import Cookies from 'universal-cookie';


export function Home() {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [, setError] = useState(false);

  const userAvatar = () => (
    <Avatar.Root>
      <Avatar.Image src={UserPhoto} />
      <Avatar.Fallback />
    </Avatar.Root>
  );

  async function getUsername(token: string) {
    try {

      const response = await api.get(`http://localhost:2812/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const { username } = response.data;
        setUsername(username);
      } else {
        console.error('Error fetching user:', response.statusText);
        setError(true);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError(true);
    }
  }

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    if (token) {
      getUsername(token);
    } else {
      console.error('Token is missing');
      setError(true);
    }
  }, []);

  /*function handleLogout() {

    // Remova também o token do cookie
    const cookies = new Cookies();
    cookies.remove('token');

    navigate('/login');
  }*/

  return (
    <div className="home">
      <header className="headerHome">
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
        <div className="user">
          <div>{username}</div>
          {/* <button className='logout' onClick={handleLogout}>Logout</button> */}
          {userAvatar()}
        </div>
      </header>
    </div>
  );
}
