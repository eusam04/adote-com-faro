import SiteLayout from '../../components/SiteLayout';

import './Colaborar.css';

function Colaborar() {

  return (

    <SiteLayout>

      <main
        className="colaborar-page site-main"
        id="conteudo-principal"
        tabIndex={-1}
      >

        {/* Hero */}
        <section className="colaborar-hero">

          <h1>Faça parte dessa missão 🐶❤️</h1>

          <p>
            Existem muitas formas de ajudar animais em situação de vulnerabilidade.
            Toda contribuição faz diferença.
          </p>

          <a
            href="#contato"
            className="colaborar-button"
          >
            Entrar em contato
          </a>

        </section>

        {/* Sobre */}
        <section className="colaborar-sobre">

          <h2>Por que colaborar?</h2>

          <p>
            O Adote com Faro acredita que cada adoção responsável transforma vidas.
            Além de adotar, você também pode contribuir para que mais animais
            recebam cuidados, carinho e uma nova oportunidade de encontrar um lar.
          </p>

        </section>

        {/* Cards */}
        <section className="colaborar-cards">

          <article className="colaborar-card">

            <h3>💰 Doações</h3>

            <p>
              Contribua financeiramente para ajudar ONGs e protetores com
              alimentação, medicamentos e cuidados veterinários.
            </p>

          </article>

          <article className="colaborar-card">

            <h3>🍖 Doação de ração</h3>

            <p>
              Doe ração, brinquedos, cobertores, caminhas e outros itens que
              fazem diferença na rotina dos animais.
            </p>

          </article>

          <article className="colaborar-card">

            <h3>🙋 Seja voluntário</h3>

            <p>
              Ofereça seu tempo para auxiliar em eventos de adoção, campanhas
              ou cuidados temporários.
            </p>

          </article>

          <article className="colaborar-card">

            <h3>📢 Compartilhe</h3>

            <p>
              Divulgue animais disponíveis para adoção e ajude-os a encontrar
              uma família responsável.
            </p>

          </article>

        </section>

        {/* Contato */}
        <section
          className="colaborar-contato"
          id="contato"
        >

          <h2>Quer colaborar?</h2>

          <p>
            Entre em contato com uma ONG parceira ou um protetor independente
            através da plataforma.
          </p>

          <p className="colaborar-email">

            📧 contato@adotecomfaro.com

          </p>

        </section>

      </main>

    </SiteLayout>

  );

}

export default Colaborar;