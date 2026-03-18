<a id="readme-top"></a>

<!-- LOGO DO PROJETO
<br />
<div align="center">
  <a href="https://github.com/drgsantaana/trabalhoFinal-CEPEDI">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Trabalho Final - Curso React - CEPEDI</h3>
  <p align="center">
    Trabalho final do curso de React oferecido pelo CEPEDI ao IFMG campus Bambui.
  </p>
</div>

<!-- SUMÁRIO -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
      <ul>
        <li><a href="#construído-com">Construído com</a></li>
      </ul>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <!-- <li><a href="#licença">Licença</a></li> -->
    <li><a href="#estrutura-do-projeto">Estrutura do Projeto<a></li>
    <li><a href="#equipe">Equipe</a></li>
  </ol>
</details>

<!-- SOBRE O PROJETO -->

## Sobre o Projeto

Projeto desenvolvido como trabalho final do curso de React oferecido pelo CEPEDI ao IFMG campus Bambui. O objetivo é aplicar os conhecimentos adquiridos durante o curso na construção de uma aplicação web utilizando React e Vite.

### Tema

O projeto é uma **calculadora funcional** com uma **rota secreta**: ao dividir por zero, o usuário é redirecionado para uma tela de login que dá acesso a um **dashboard fictício de controle do Jogo do Bicho**. O dashboard apresenta estatísticas de apostas, histórico, desempenho semanal e os "bichos" mais apostados — tudo com dados simulados para fins de demonstração acadêmica.

<!-- CONSTRUIDO COM -->

### Construído com:

- [![React][React.js]][React-url]
- [![Vite][Vite.js]][Vite-url]

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<!-- COMEÇANDO -->

## Começando

Instruções de como configurar o projeto localmente.
Para obter uma cópia local funcionando, siga os passos abaixo.

### Pré-requisitos

Ferramentas necessárias para rodar o projeto:

- [Node.js](https://nodejs.org) (versão LTS recomendada)
- npm
    ```sh
    npm install npm@latest -g
    ```

### Instalação

1. Clone o repositório
    ```sh
    git clone https://github.com/drgsantaana/trabalhoFinal-CEPEDI.git
    ```
2. Instale os pacotes NPM
    ```sh
    npm install
    ```
3. Crie o arquivo de variáveis de ambiente a partir do modelo
    ```sh
    cp .env.exemple .env.local
    ```
    Abra o `.env.local` e substitua os valores pelas suas credenciais do [Supabase](https://supabase.com):
    ```env
    VITE_SUPABASE_URL=https://seu-projeto.supabase.co
    VITE_SUPABASE_PUBLISHABLE_KEY=sua-anon-key
    ```
4. (Opcional) Se fizer fork, altere a URL remota para o seu repositório
    ```sh
    git remote set-url origin git@github.com:seu_usuario/seu_repositorio.git
    git remote -v # confirme as alterações
    ```
5. Rode o projeto localmente
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<!-- LICENÇA -->

<!-- ## Licença

Distribuído sob a Licença MIT. Veja `LICENSE.txt` para mais informações.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p> -->

## Estrutura do Projeto

Aplicação React com Vite, com Tailwind CSS e `shadcn/ui`.

### 📂 Visão Geral dos Diretórios (`src/`)

- **`assets/`** — Recursos estáticos (logo do projeto)
  - `logo.svg`

- **`components/`**
  - **`Calculator/`**
    - `Display.jsx`: Exibe o valor atual e a operação em andamento, formatando números longos.
    - `Keyboard.jsx`: Grid de botões da calculadora, repassa eventos de clique via props.
  - `Header.jsx`: Navbar fixa com logo, links de navegação e ícone de perfil.
  - `PrivateRoute.jsx`: Componente de rota protegida — redireciona para `/login` se não autenticado.
  - **`ui/`** (shadcn/ui)
    - `button.jsx`
    - `card.jsx`

- **`context/`**
  - `AuthContext.jsx`: Context API para gerenciamento global de autenticação (login, registro, logout, sessão).

- **`hooks/`**
  - `useCalculator.js`: Hook customizado com lógica da calculadora (operações, estado do display, roteamento secreto).

- **`lib/`**
  - `supabase.js`: Cliente Supabase configurado com variáveis de ambiente.
  - `utils.js`: Utilitário `cn()` para merge de classes Tailwind.

- **`pages/`**
  - `calculator/index.jsx`: Página principal — calculadora funcional.
  - `login/index.jsx`: Página de login/registro com `react-hook-form` e tema cyberpunk.
  - `login/login.css`: Estilos da página de login (fontes Google, animações, scanlines).
  - `dashboard/index.jsx`: Dashboard protegido com estatísticas do Jogo do Bicho.
  - `dashboard/data.js`: Camada de dados — funções de fetch/insert no Supabase e lista de animais.
  - `perfil/index.jsx`: Página de perfil do usuário (rota dinâmica `/perfil/:id`).

- `App.jsx`: Layout raiz com Header e Outlet para rotas filhas.
- `routes.jsx`: Configuração de rotas (estáticas, dinâmicas e privadas).
- `main.jsx`: Ponto de entrada — AuthProvider + RouterProvider.
- `index.css`: Estilos globais e variáveis CSS.

  <p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<!-- EQUIPE -->
## Equipe

**Alunos:**

- <img src="https://github.com/drgsantaana.png" width="30" style="border-radius: 50%;" /> [Daniel Reis Gonçalves Sant'ana](https://github.com/drgsantaana)
- <img src="https://github.com/VictorRamos13.png" width="30" style="border-radius: 50%;" /> [Victor Hordones Ramos](https://github.com/VictorRamos13)
- <img src="https://github.com/gbfllp.png" width="30" style="border-radius: 50%;" /> [Gabriel Fellipe Corrêa Costa](https://github.com/gbfllp)

**Professor e Orientador:**

- <img src="https://github.com/maurohsilva.png" width="30" style="border-radius: 50%;" /> [Mauro Henrique](https://github.com/maurohsilva)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<!-- Badges do Shields.io -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[React-url]: https://react.dev/
[Vite.js]: https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite
[Vite-url]: https://vite.dev/
