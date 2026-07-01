import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Animais from '../pages/Animais/Animais';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import DashboardONG from '../pages/DashboardONG/DashboardONG';
import PainelProtetor from '../pages/PainelProtetor/PainelProtetor';
import PainelUsuario from '../pages/PainelUsuario/PainelUsuario';
import CadastrarAnimal from '../pages/CadastroAnimal/CadastrarAnimal';
import SolicitarAdocao from '../pages/SolicitarAdocao/SolicitarAdocao';
import SolicitacoesRecebidas from '../pages/SolicitacoesRecebidas/SolicitacoesRecebidas';
import MeusAnimais from '../pages/MeusAnimais/MeusAnimais';
import MinhasSolicitacoes from '../pages/MinhasSolicitacoes/MinhasSolicitacoes';
import EditarAnimal from '../pages/EditarAnimal/EditarAnimal';
import Colaborar from '../pages/Colaborar/Colaborar';



function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/animais" element={<Animais />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/dashboard"
          element={<DashboardONG />}
        />

        <Route
          path="/painel-protetor"
          element={<PainelProtetor />}
        />

        <Route path="/painel-usuario"
          element={<PainelUsuario />}
        />

        <Route
          path='/cadastrar-animal'
          element={<CadastrarAnimal />}
        />

        <Route
          path="/solicitar-adocao/:id"
          element={<SolicitarAdocao />}
        />

        <Route
          path="/solicitacoes-recebidas"
          element={<SolicitacoesRecebidas />}
        />


        <Route
          path="/meus-animais"
          element={<MeusAnimais />}
        />

        <Route
          path="/minhas-solicitacoes"
          element={<MinhasSolicitacoes />}
        />

        <Route
          path="/editar-animal/:id"
          element={<EditarAnimal />}
        />

        <Route
          path="/colaborar"
          element={<Colaborar />}
        />


      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;