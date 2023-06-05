import * as Dialog from '@radix-ui/react-dialog'
import * as HoverCard from '@radix-ui/react-hover-card';
import * as Avatar from '@radix-ui/react-avatar';
import { Cross2Icon } from '@radix-ui/react-icons';
import pikachuFace from '../../styles/assets/pikachuFace.png'
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';


type Pokemon = {
  name: string;
  image: string;
  classification: string;
  types: string[];
  maxCP: number;
  height: {
    minimum: string;
    maximum: string;
  };
  weight: {
    minimum: string;
    maximum: string;
  };
}


export function PokeDex() {
  const [pikachu, setPikachu] = useState<Pokemon | null>(null);
  const [bulbasaur, setBulbasaur] = useState<Pokemon | null>(null);
  const [squirtle, setSquirtle] = useState<Pokemon | null>(null);
  const [charmander, setCharmander] = useState<Pokemon | null>(null);
  const [mew, setMew] = useState<Pokemon | null>(null);

  async function loadPokemonData(name: string, setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>) {
    try {
      const response = await api.get(`/favorite/pokemon/${name}`);
      const responseData = response.data;
      const pokemon = responseData.data;
      setPokemon(pokemon);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPokemonData('Pikachu', setPikachu);
    loadPokemonData('Bulbasaur', setBulbasaur);
    loadPokemonData('Squirtle', setSquirtle);
    loadPokemonData('Charmander', setCharmander);
    loadPokemonData('Mew', setMew);
  }, []);

  const dialogStart = () => (

    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="buttonStart">
          Gotta catch 'em all!
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className='dialogContent'>
          <Dialog.Title className='dialogTitle'>Choose your favorite Pokemon:</Dialog.Title>

          <div className="Avatares">

            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Avatar.Root>
                  {pikachu ? (
                    <Avatar.Image className='Avatar' src={pikachu.image} alt="Pikachu" />
                  ) : (
                    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                      PK
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className='hovercardContent'
                  sideOffset={15}
                >
                  <div onClick={() => loadPokemonData('Pikachu', setPikachu)}>
                    {pikachu ? (
                      <>
                        <img className='Avatar' src={pikachu.image} alt="Pikachu" />
                        <p className='Name'>{pikachu.name}</p>
                        <p className='Class'>{pikachu.classification}</p>
                        <p className='Type'>{pikachu.types}</p>
                        <p className='maxCP'> maxCP: {pikachu.maxCP}</p>
                        <p className='Height'>Height: {pikachu.height.minimum} - {pikachu.height.maximum}</p>
                        <p className='Weight'>Weight: {pikachu.weight.minimum} - {pikachu.weight.maximum}</p>
                      </>
                    ) : (
                      <span>Pikachu</span>
                    )}
                  </div>
                  <HoverCard.HoverCardArrow
                    width={15}
                    className='hovercardArrow'
                  />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Avatar.Root>
                  {bulbasaur ? (
                    <Avatar.Image className='Avatar' src={bulbasaur.image} alt="Bulbasaur" />
                  ) : (
                    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                      BB
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className='hovercardContent'
                  sideOffset={15}
                >
                  <div onClick={() => loadPokemonData('Bulbasaur', setBulbasaur)}>
                    {bulbasaur ? (
                      <>
                        <img className='Avatar' src={bulbasaur.image} alt="Bulbasaur" />
                        <p className='Name'>{bulbasaur.name}</p>
                        <p className='Class'>{bulbasaur.classification}</p>
                        <p className='Type'>{bulbasaur.types}</p>
                        <p className='maxCP'> maxCP: {bulbasaur.maxCP}</p>
                        <p className='Height'>Height: {bulbasaur.height.minimum} - {bulbasaur.height.maximum}</p>
                        <p className='Weight'>Weight: {bulbasaur.weight.minimum} - {bulbasaur.weight.maximum}</p>
                      </>
                    ) : (
                      <span>Bulbasaur</span>
                    )}
                  </div>
                  <HoverCard.HoverCardArrow
                    width={15}
                    className='hovercardArrow'
                  />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Avatar.Root>
                  {squirtle ? (
                    <Avatar.Image className='Avatar' src={squirtle.image} alt="Squirtle" />
                  ) : (
                    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                      SQ
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className='hovercardContent'
                  sideOffset={15}
                >
                  <div onClick={() => loadPokemonData('Squirtle', setSquirtle)}>
                    {squirtle ? (
                      <>
                        <img className='Avatar' src={squirtle.image} alt="Squirtle" />
                        <p className='Name'>{squirtle.name}</p>
                        <p className='Class'>{squirtle.classification}</p>
                        <p className='Type'>{squirtle.types}</p>
                        <p className='maxCP'> maxCP: {squirtle.maxCP}</p>
                        <p className='Height'>Height: {squirtle.height.minimum} - {squirtle.height.maximum}</p>
                        <p className='Weight'>Weight: {squirtle.weight.minimum} - {squirtle.weight.maximum}</p>
                      </>
                    ) : (
                      <span>Squirtle</span>
                    )}
                  </div>
                  <HoverCard.HoverCardArrow
                    width={15}
                    className='hovercardArrow'
                  />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Avatar.Root>
                  {charmander ? (
                    <Avatar.Image className='Avatar' src={charmander.image} alt="Charmander" />
                  ) : (
                    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                      CM
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className='hovercardContent'
                  sideOffset={15}
                >
                  <div onClick={() => loadPokemonData('Charmander', setCharmander)}>
                    {charmander ? (
                      <>
                        <img className='Avatar' src={charmander.image} alt="Charmander" />
                        <p className='Name'>{charmander.name}</p>
                        <p className='Class'>{charmander.classification}</p>
                        <p className='Type'>{charmander.types}</p>
                        <p className='maxCP'> maxCP: {charmander.maxCP}</p>
                        <p className='Height'>Height: {charmander.height.minimum} - {charmander.height.maximum}</p>
                        <p className='Weight'>Weight: {charmander.weight.minimum} - {charmander.weight.maximum}</p>
                      </>
                    ) : (
                      <span>Charmander</span>
                    )}
                  </div>
                  <HoverCard.HoverCardArrow
                    width={15}
                    className='hovercardArrow'
                  />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
            <HoverCard.Root>
              <HoverCard.Trigger asChild>
                <Avatar.Root>
                  {mew ? (
                    <Avatar.Image className='Avatar' src={mew.image} alt="Mew" />
                  ) : (
                    <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                      Mew
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content
                  className='hovercardContent'
                  sideOffset={15}
                >
                  <div onClick={() => loadPokemonData('Mew', setMew)}>
                    {mew ? (
                      <>
                        <img className='Avatar' src={mew.image} alt="Mew" />
                        <p className='Name'>{mew.name}</p>
                        <p className='Class'>{mew.classification}</p>
                        <p className='Type'>{mew.types}</p>
                        <p className='maxCP'> maxCP: {mew.maxCP}</p>
                        <p className='Height'>Height: {mew.height.minimum} - {mew.height.maximum}</p>
                        <p className='Weight'>Weight: {mew.weight.minimum} - {mew.weight.maximum}</p>
                      </>
                    ) : (
                      <span>Mew</span>
                    )}
                  </div>
                  <HoverCard.HoverCardArrow
                    width={15}
                    className='hovercardArrow'
                  />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>

          </div>
          <Dialog.Close asChild>
            <button className="buttonSave">Save</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )

  return (
    <div className="pokeDex">
      <img width={300} src={pikachuFace} alt="face pikachu" />
      <div>{dialogStart()}</div>
    </div>
  )
}