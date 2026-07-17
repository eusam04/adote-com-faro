import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import './MeusAnimais.css';
import SiteLayout from '../../components/SiteLayout';
import faroEmoticon2 from '../../assets/faro-emoticon2.png';
import { getPainelRoute } from '../../utils/getPainelRoute';

function MeusAnimais() {
  const navigate = useNavigate();

  const [animais, setAnimais] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [animalConfirmacao, setAnimalConfirmacao] = useState(null);


  async function removerAnimal(id) {

    if (animalConfirmacao !== id) {

      setAnimalConfirmacao(id);

      setMensagem(
        'Clique novamente em remover para confirmar.'
      );

      setTimeout(() => {
        setMensagem('');
        setAnimalConfirmacao(null);
      }, 3000);

      return;
    }

    const token = localStorage.getItem('token');

    try {

      await api.delete(
        `/animais/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAnimais(
        animais.filter(
          animal => animal.id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert('Erro ao remover animal');

    }

  }

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
    <SiteLayout
      headerActions={
        <button
          type="button"
          className="voltar-nav-button"
          onClick={() => navigate(getPainelRoute())}
          aria-label="Voltar para a página anterior"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
      }
    >
      <main className="meus-animais-page site-main" id="conteudo-principal" tabIndex={-1}>

        <section className="meus-animais-header">
          <h1>
            <img
              className="meus-animais-titulo-emoticon"
              src={faroEmoticon2}
              alt="Mascote Faro"
            />
            Meus Animais
          </h1>

          <p>
            Veja os animais cadastrados por você e acompanhe o status de cada um.
          </p>

          {mensagem && (
            <p className="mensagem-banner">
              {mensagem}
            </p>
          )}

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

              <div className="meu-animal-actions">

                {animal.status === 'adotado' ? (
                  <button
                    className="editar-animal-button"
                    disabled
                  >
                    Editar
                  </button>
                ) : (
                  <button
                    className="editar-animal-button"
                    onClick={() => navigate(`/editar-animal/${animal.id}`)}
                  >
                    Editar
                  </button>
                )}

                <button
                  className="remover-animal-button"
                  onClick={() => removerAnimal(animal.id)}
                >
                  Remover
                </button>

              </div>

            </article>
          ))}

        </section>

      </main>
    </SiteLayout>
  );
}

export default MeusAnimais;