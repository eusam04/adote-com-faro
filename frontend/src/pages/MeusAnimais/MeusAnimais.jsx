import { useEffect, useState } from 'react';

import api from '../../services/api';
import './MeusAnimais.css';
import SiteLayout from '../../components/SiteLayout';

function MeusAnimais() {
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    async function carregarMeusAnimais() {
      const token = localStorage.getItem('token');

      try {
        const response = await api.get('/meus-animais', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAnimais(response.data);

      } catch (error) {
        console.log(error);
      }
    }

    carregarMeusAnimais();
  }, []);

  return (
    <SiteLayout>
    <main className="meus-animais-page site-main" id="conteudo-principal" tabIndex={-1}>

      <section className="meus-animais-header">
        <h1>Meus Animais</h1>

        <p>
          Veja os animais cadastrados por você e acompanhe o status de cada um.
        </p>
      </section>

      <section className="meus-animais-lista">

        {animais.length === 0 && (
          <p className="meus-animais-vazio">
            Você ainda não cadastrou nenhum animal.
          </p>
        )}

        {animais.map((animal) => (
          <article
            key={animal.id}
            className={`meu-animal-card ${animal.status === 'adotado' ? 'meu-animal-adotado' : ''}`}
          >

            {animal.foto && (
              <img
                className="meu-animal-foto"
                src={`http://localhost:3000/uploads/${animal.foto}`}
                alt={`Foto de ${animal.nome}`}
              />
            )}

            <h2>{animal.nome}</h2>

            <p>
              <strong>Idade:</strong> {animal.idade} ano(s)
            </p>

            <p>
              <strong>Porte:</strong> {animal.porte}
            </p>

            <p>
              <strong>Descrição:</strong> {animal.descricao}
            </p>

            <p>
              <strong>Status:</strong> {animal.status}
            </p>

          </article>
        ))}

      </section>

    </main>
    </SiteLayout>
  );
}

export default MeusAnimais;