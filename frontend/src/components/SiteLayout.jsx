// Importamos o componente 'Link' do React Router para fazer navegação rápida sem recarregar a tela.
import { Link } from 'react-router-dom';

// Importamos a imagem da logo do nosso projeto.
import logo from '../assets/Faro-logo.png';

// O SiteLayout é o esqueleto principal (layout global) que envolve todas as páginas do nosso site.
// Ele define onde ficam o cabeçalho (header), o conteúdo principal (children) e o rodapé (footer).
//
// Adicionamos a propriedade 'headerActions' (ações do cabeçalho) como parâmetro.
// Isso permite que cada página escolha quais botões ou menus quer exibir no cabeçalho.
// Por exemplo, a página Home pode enviar os botões de "Entrar" e "Criar conta",
// enquanto outras páginas podem não enviar nada, deixando o cabeçalho limpo.
function SiteLayout({ children, headerActions }) {
  return (
    <div className="site-layout">
      {/* 
        Link de acessibilidade invisível (skip link).
        Permite que usuários de teclado pulem o menu do cabeçalho e vão direto para o conteúdo.
        Ele aponta para o ID '#conteudo-principal' que está na tag <main> de cada página.
      */}
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo principal
      </a>

      {/* Cabeçalho global do site */}
      <header className="site-header">
        {/* Logo do site que sempre funciona como um link para voltar à página inicial */}
        <Link to="/" aria-label="Adote com Faro — página inicial">
          <img src={logo} alt="" className="site-logo" />
        </Link>

        {/* 
          Aqui renderizamos de forma dinâmica o conteúdo que a página atual nos enviar.
          Se a página enviar botões (através de 'headerActions'), eles serão exibidos aqui.
          Isso resolve o problema de ter botões fixos globais que aparecem onde não deveriam!
        */}
        {headerActions}
      </header>

      {/* 
        O '{children}' representa o conteúdo específico de cada página (como a Home, etc.).
        Tudo o que for escrito dentro de <SiteLayout>...</SiteLayout> em outras telas será renderizado aqui.
      */}
      {children}

      {/* Rodapé global do site */}
      <footer className="site-footer">
        <p>&copy; Todo animal merece um lar. Adote com Faro.</p>
      </footer>
    </div>
  );
}

// Exportamos o componente do layout para que possamos usá-lo em todas as páginas do site.
export default SiteLayout;
