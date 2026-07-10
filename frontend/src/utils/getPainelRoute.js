// Utilitário que retorna a rota do painel correto de acordo com o tipo
// do usuário logado (armazenado no localStorage durante o login).
//
// Regras (iguais às do redirecionamento após o login):
//   - 'ong'      -> /dashboard (Dashboard da ONG)
//   - 'cuidador' -> /painel-protetor (Painel do Protetor)
//   - qualquer outro (ex.: 'usuario') -> /painel-usuario
export function getPainelRoute() {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const tipo = usuario?.tipo;

    if (tipo === 'ong') {
      return '/dashboard';
    }

    if (tipo === 'cuidador') {
      return '/painel-protetor';
    }

    return '/painel-usuario';

  } catch {
    // Se não houver usuário válido no localStorage, cai no painel padrão.
    return '/painel-usuario';
  }
}
