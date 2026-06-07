import { useEffect, useState } from 'react';
import SiteLayout from '../../components/SiteLayout';
import api from '../../services/api';
import './MinhasSolicitacoes.css';

function MinhasSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);

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
    <SiteLayout>
      <main
        className="minhas-solicitacoes-page site-main"
        id="conteudo-principal"
        tabIndex={-1}
      >

      <section className="minhas-solicitacoes-header">
        <h1>Minhas Solicitações</h1>

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