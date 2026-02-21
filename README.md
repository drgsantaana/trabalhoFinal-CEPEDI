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
3. (Opcional) Se fizer fork, altere a URL remota para o seu repositório
    ```sh
    git remote set-url origin git@github.com:seu_usuario/seu_repositorio.git
    git remote -v # confirme as alterações
    ```
4. Rode o projeto localmente
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

- **`components/`**
  - **`Calculator/`**
    - `Calculator.jsx`: Renderiza a Display e o Keyboard. Envolve a UI com `Card` do shadcn.
    - `Display.jsx`: Controla como as contas e totais aparecem, formatando números muito longos.
    - `Keyboard.jsx`: Organiza os botões em formato grid e repassa eventos de clique.
  - **`ui/`** (`shadcn`)
    - `button.jsx`
    - `card.jsx`

- **`context/`**
  - `AuthContext.jsx`: Rastreador de Login da aplicação temporária.

- **`hooks/`** (Complexidades encapsuladas)
  - `useCalculator.js`: Gerencia dados de operadores, strings atuais de display, lógicas para soma/divisão/negativos/resets, e as decisões de roteamento.

  <p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<!-- EQUIPE -->
## Equipe

**Alunos:**

- <img src="https://github.com/drgsantaana.png" width="30" style="border-radius: 50%;" /> [Daniel Santana](https://github.com/drgsantaana)
- <img src="https://github.com/VictorRamos13.png" width="30" style="border-radius: 50%;" /> [Victor Hordones](https://github.com/VictorRamos13)
- <img src="https://github.com/gbfllp.png" width="30" style="border-radius: 50%;" /> [Gabriel Fellipe](https://github.com/gbfllp)

**Professor e Orientador:**

- <img src="https://github.com/maurohsilva.png" width="30" style="border-radius: 50%;" /> [Mauro Henrique](https://github.com/maurohsilva)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

<!-- Badges do Shields.io -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[React-url]: https://react.dev/
[Vite.js]: https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite
[Vite-url]: https://vite.dev/
