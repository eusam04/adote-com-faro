import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Animais from '../pages/Animais/Animais';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import DashboardONG from '../pages/DashboardONG/DashboardONG';
import PainelUsuario from '../pages/PainelUsuario/PainelUsuario';
import CadastrarAnimal from '../pages/CadastroAnimal/CadastrarAnimal';

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
          path="/painel"
          element={<PainelUsuario />}
        />  

        <Route
          path='/cadastrar-animal'
          element={<CadastrarAnimal />} 
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;