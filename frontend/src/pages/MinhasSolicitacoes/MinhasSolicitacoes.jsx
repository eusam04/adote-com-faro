import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SiteLayout from '../../components/SiteLayout';
import api from '../../services/api';
import './MinhasSolicitacoes.css';
import faroEmoticon4 from '../../assets/faro-emoticon4.png';

function MinhasSolicitacoes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [solicitacoes, setSolicitacoes] = useState([]);

  function voltar() {
    const from = location.state?.from;
    navigate(from || '/');
  }

  useEffect(() => {
    async function carregarSolicitacoes() {
      const token = localStorage.getItem('token');

      try {
        const response = await api.get(
          '/minhas-solicitacoes-usuario',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setSolicitacoes(response.data);

      } catch (error) {
        console.log(error);
      }
    }

    carregarSolicitacoes();
  }, []);

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
      <main
        className="minhas-solicitacoes-page site-main"
        id="conteudo-principal"
        tabIndex={-1}
      >

      <section className="minhas-solicitacoes-header">
        <h1>
          <img
            className="minhas-solicitacoes-titulo-emoticon"
            src={faroEmoticon4}
            alt="Mascote Faro"
          />
          Minhas Solicitações
        </h1>

        <p>
          Acompanhe o andamento das suas solicitações de adoção.
        </p>
      </section>

      <section className="minhas-solicitacoes-lista">

        {solicitacoes.length === 0 && (
          <p className="minhas-solicitacoes-vazio">
            Você ainda não realizou nenhuma solicitação.
          </p>
        )}

        {solicitacoes.map((solicitacao) => (
          <article
            key={solicitacao.id}
            className="minha-solicitacao-card"
          >
            <h2>
              {solicitacao.animal}
            </h2>

            <p>
              <strong>Status:</strong>{' '}
              {solicitacao.status}
            </p>

            <p>
              <strong>Data da solicitação:</strong>{' '}
              {new Date(
                solicitacao.data_solicitacao
              ).toLocaleDateString('pt-BR')}
            </p>

          </article>
        ))}

      </section>

</main>
      </SiteLayout>
    );
}

export default MinhasSolicitacoes;