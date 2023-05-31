import * as Avatar from '@radix-ui/react-avatar';
import UserPhoto from '../../styles/assets/userphoto.png';
import pokeballHome from '../../styles/assets/pokebolahome.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';
import Cookies from 'universal-cookie';

type Pokemon = {
  number: string;
  image: string;
  name: string;
  classification: string;
  types: string[];
  maxCP: number;
};

export function Home() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [, setError] = useState(false);
  const [data, setData] = useState<Pokemon[]>([])

  const userAvatar = () => (
    <Avatar.Root>
      <Avatar.Image src={UserPhoto} width={60} />
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

  async function pokeList() {
    try {
      const response = await api.get('/pokemons');
      const responseData = response.data;
      setData(responseData.pokemons);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    pokeList();
  }, []);

  return (
    <div id="home">
      <header className="headerHome">
        <div className="navbar">
          <img
            className="logo"
            src="https://fontmeme.com/permalink/230504/99e8e7a63ec54356a7e02a6e6a74d7d5.png"
            alt="pokemon-font"
            width={200}
          />
          <ul>
            <li><a href='#home'>Home</a></li>
            <li><a href='#pokeListCard'>Pokelist</a></li>
            <li>Pokedex</li>
            <li>Battle Pass</li>
          </ul>
        </div>
        <div className="user">
          <div className='username'>{username}</div>
          {/* <button className='logout' onClick={handleLogout}>Logout</button> */}
          {userAvatar()}
        </div>
      </header>
      <div className="content">
        <div className="textcontent">
          <h1 className='hometitle'>
            Hello, welcome!
            <br />
            Let's explore the Pokemon universe with PokeDev!
          </h1>
          <p className='homesubtitle'>
            Here you can check a list with all the pokemons in this beautiful world and you can even have your customized pokedex.
          </p>
          <button
            className='pokeDexButton'
          >
            <a
              className="pokeDexLink"
              href={`http://127.0.0.1:5173/pokedex`}>Create a PokeDex!
            </a>
          </button>
        </div>
        <img className='pokeballHome' src={pokeballHome} alt="pokeball" width={500} />
      </div>
      <div id="pokeListCard">
        <h1 className='contentTitle'>PokeList</h1>
        <div className='pokeListContent'>
          {data.map((pokemon) => (
            <div
              key={pokemon.number}
            >
              <p className='pokemonNumber'>{pokemon.number}</p>
              <img
                className='pokemonImg'
                src={pokemon.image}
                alt={pokemon.name}
              />
              <div
                className='pokeList'
              >
                <p className='pokemonName'>{pokemon.name}</p>
                <p className='pokemonClass'>{pokemon.classification}</p>
                <p className='pokemonType'>{pokemon.types.join(', ')}</p>
                <p className='pokemonCP'>Max CP:{pokemon.maxCP}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
