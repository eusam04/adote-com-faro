import { Link } from 'react-router-dom';
import SiteLayout from '../../components/SiteLayout';
import './Home.css';
import faro from '../../assets/Faro1.png';
import faroCard1 from '../../assets/Faro-card-1.png';
import faroCard2 from '../../assets/Faro-card-2.png';
import fariCard3 from '../../assets/Faro-card-3.png';

// Componente da Página Inicial (Home)
// Estrutura simplificada mantendo a semântica e a acessibilidade
function Home() {
  return (
    /* 
      Passamos os botões de Entrar e Criar conta diretamente na propriedade 'headerActions' do SiteLayout.
      Dessa forma, esses botões serão exibidos apenas no topo da página inicial (Home).
      Quando você criar outras páginas e usar o <SiteLayout>, basta não passar a propriedade 'headerActions'
      ou passar outros botões que quiser! Isso dá total controle para você futuramente.
    */
    <SiteLayout
      headerActions={
        <nav aria-label="Navegação principal">
          <ul className="site-nav">
            <li>
              <Link to="/login" className="btn-login">
                Entrar
              </Link>
            </li>
            <li>
              <Link to="/cadastro" className="btn-cadastro">
                Criar conta
              </Link>
            </li>
          </ul>
        </nav>
      }
    >
      {/* 
        A tag <main> indica o conteúdo principal da página.
        O id "conteudo-principal" permite que o link de acessibilidade (skip link) pule direto para cá.
        O tabIndex={-1} permite que este bloco receba foco por teclado para facilitar a navegação.
      */}
      <main id="conteudo-principal" className="home-main site-main" tabIndex={-1}>
        
        {/* h1 oculto visualmente usando CSS (sr-only), mas lido por leitores de tela */}
        <h1 className="sr-only">Adote com Faro</h1>

        {/* Seção Sobre o projeto com associação de acessibilidade (aria-labelledby) */}
        <section className="main-card" aria-labelledby="titulo-sobre">
          <Link to="/" aria-label="Saiba mais sobre o Adote com Faro">
            <img
              src={faro}
              alt="Faro, o simpático cachorrinho mascote da plataforma"
              className="card-image"
            />
          </Link>
          
          <div className="text-content">
            <h2 id="titulo-sobre" className="objective-title">O que é o Adote com Faro?</h2>
            
            <p className="objective-text1">
              O Adote com Faro é uma plataforma criada para conectar animais, ONGs e pessoas dispostas a transformar vidas através 
              da adoção e da solidariedade.
            </p>

            <p className="objective-text2">
              No centro dessa missão está o Faro, o mascote da plataforma: um cachorrinho detetive curioso e acolhedor, 
              responsável por “encontrar” novos lares, novas conexões e novas formas de ajudar animais que precisam de cuidado e amor.
            </p>
          </div>
        </section>

        {/* Seção com as três opções/funcionalidades do site */}
        <section className="small-cards" aria-label="Funcionalidades da plataforma">
          
          {/* Opção 1: Ver Animais */}
          <article className="small-card-row" aria-labelledby="card-ver-animais">
            <div className="small-card-image">
              {/* Imagem decorativa com alt vazio para não repetir informação nos leitores de tela */}
              <img src={faroCard1} alt="" />
            </div>
            
            <div className="small-card">
              <h3 id="card-ver-animais" className="small-card-title">Ver Animais</h3>
              <p className="small-card-text">
                Conheça animais que estão em busca de um novo lar cheio de amor, cuidado e carinho. Encontre seu novo melhor amigo e transforme uma vida através da adoção.
              </p>
              <Link to="/animais" className="btn-small-card">
                Animais para adoção
              </Link>
            </div>
          </article>

          {/* Opção 2: Colaborar */}
          <article className="small-card-row" aria-labelledby="card-colaborar">
            <div className="small-card-image">
              <img src={faroCard2} alt="" />
            </div>
            
            <div className="small-card">
              <h3 id="card-colaborar" className="small-card-title">Colaborar</h3>
              <p className="small-card-text">
                Ajude ONGs e animais resgatados com doações, apoio e contribuições que fazem a diferença. Pequenas atitudes também salvam vidas.
              </p>
              <Link to="/colaborar" className="btn-small-card">
                Quero colaborar
              </Link>
            </div>
          </article>

          {/* Opção 3: Histórias */}
          <article className="small-card-row" aria-labelledby="card-historias">
            <div className="small-card-image">
              <img src={fariCard3} alt="" />
            </div>
            
            <div className="small-card">
              <h3 id="card-historias" className="small-card-title">Histórias de Adoção</h3>
              <p className="small-card-text">
                Descubra histórias emocionantes de animais que encontraram um novo começo. Cada adoção carrega uma jornada de amor, esperança e recomeço.
              </p>
              <Link to="/historias" className="btn-small-card">
                Ver histórias
              </Link>
            </div>
          </article>

        </section>
      </main>
    </SiteLayout>
  );
}

export default Home;
