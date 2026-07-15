import { useEffect, useState } from 'react';
import SiteLayout from '../../components/SiteLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import './Animais.css';
import api from '../../services/api';
import faroEmoticon from '../../assets/faro-emoticon1.png';

// Componente da Página de Animais
// Lista todos os animais disponíveis para adoção
function Animais() {

  const navigate = useNavigate();
  const location = useLocation();

  const [animais, setAnimais] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  useEffect(() => {

    /**
     * Função assíncrona para carregar a lista de animais do backend
     * Faz uma requisição GET para o endpoint /animais
     * Atualiza o estado com os dados recebidos
     */
    async function carregarAnimais() {

      try {

        const response = await api.get('/animais');

        setAnimais(response.data);

      } catch (error) {

        // Log do erro para debug (em produção, poderia usar um serviço de logging)
        console.log(error);

      }

    }

    carregarAnimais();

  }, []); // Array vazio significa que este efeito roda apenas uma vez, no mount do componente

  function voltar() {
    const from = location.state?.from;
    navigate(from || '/');
  }

  function solicitarAdocao(id) {

    const token = localStorage.getItem('token');

    if (!token) {

      setMensagem(
        'Para solicitar a adoção de um animal, é necessário criar uma conta ou fazer login.'
      );

      setMostrarMensagem(true);

      setTimeout(() => {

        navigate(
          '/cadastro',
          {
            state: {
              redirectTo: `/solicitar-adocao/${id}`
            }
          }
        );

      }, 2000);

      return;
    }

    navigate(`/solicitar-adocao/${id}`);

  }

  return (
    <SiteLayout
      headerActions={
        <button
          type="button"
          className="voltar-nav-button"
          onClick={voltar}
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
      {/* 
        A tag <main> indica o conteúdo principal da página.
        O id "conteudo-principal" permite que o link de acessibilidade (skip link) pule direto para cá.
        O tabIndex={-1} permite que este bloco receba foco por teclado para facilitar a navegação.
      */}
      <main id="conteudo-principal" className="animais-main site-main" tabIndex={-1}>
        <h1 className="animais-titulo">
          {mostrarMensagem && (
            <p className="mensagem-feedback">
              {mensagem}
            </p>
          )}
          <img
            className="animais-titulo-emoticon"
            src={faroEmoticon}
            alt="Mascote Faro"
          />
          Animais Disponíveis para Adoção
        </h1>
        <div className="animais-lista">
          {animais.map((animal) => (
            <article
              key={animal.id}
              className={`animal-card ${animal.status === 'adotado' ? 'animal-card-adotado' : ''}`}
            >

              {animal.foto && (
                <img
                  className="animal-card-foto"
                  src={`http://localhost:3000/uploads/${animal.foto}`}
                  alt={`Foto de ${animal.nome}`}
                />
              )}

              <h2 className="animal-card-nome">
                {animal.nome}
              </h2>

              <p className="animal-card-descricao">
                {animal.descricao}
              </p>

              {animal.status === 'adotado' ? (
                <>
                  <button
                    className="animal-adotar-button"
                    disabled
                  >
                    Já adotado
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="animal-adotar-button"
                  onClick={() => solicitarAdocao(animal.id)}
                >
                  Quero Adotar
                </button>
              )}

            </article>
          ))}
        </div>
      </main>
    </SiteLayout>
  );
}

export default Animais;