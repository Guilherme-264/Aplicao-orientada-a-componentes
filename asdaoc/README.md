# Mini E-commerce com React + JSON Server

Este projeto é uma aplicação frontend de e-commerce desenvolvida em React, utilizando JSON Server como backend simulado. A aplicação permite listar produtos, visualizar detalhes, gerenciar um carrinho de compras, cadastrar e editar produtos.

## 📋 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **React Router DOM** - Roteamento para aplicações React
- **TailwindCSS** - Framework CSS utilitário para estilização
- **JSON Server** - API REST simulada para desenvolvimento
- **Vite** - Build tool e dev server

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório ou extraia os arquivos do projeto

2. Instale as dependências:
```bash
npm install
```

### Comandos Disponíveis

#### Iniciar o servidor de desenvolvimento (React)
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

#### Iniciar o JSON Server
Em um terminal separado, execute:
```bash
npm run server
```
O JSON Server estará disponível em `http://localhost:3001`

**Importante:** É necessário ter ambos os servidores rodando simultaneamente para que a aplicação funcione corretamente.

#### Build para produção
```bash
npm run build
```

#### Preview da build de produção
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
asdaoc/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.jsx      # Cabeçalho com navegação
│   │   └── ProductCard.jsx # Card de produto para listagem
│   ├── context/            # Context API
│   │   └── CartContext.jsx # Contexto global do carrinho
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx        # Listagem de produtos (/)
│   │   ├── ProductDetails.jsx # Detalhes do produto (/produto/:id)
│   │   ├── Cart.jsx        # Carrinho de compras (/carrinho)
│   │   ├── ProductForm.jsx # Formulário de cadastro/edição (/cadastro, /editar/:id)
│   │   └── NotFound.jsx    # Página 404
│   ├── services/           # Serviços de API
│   │   └── api.js          # Funções para consumo da API
│   ├── App.jsx             # Componente principal com rotas
│   ├── main.jsx            # Ponto de entrada da aplicação
│   └── index.css           # Estilos globais e TailwindCSS
├── db.json                 # Banco de dados do JSON Server
├── package.json            # Dependências e scripts
├── vite.config.js          # Configuração do Vite
├── tailwind.config.js      # Configuração do TailwindCSS
└── README.md               # Este arquivo
```

## 🎯 Funcionalidades Implementadas

### 1. Home - Listagem de Produtos (Rota: `/`)

 Exibe todos os produtos cadastrados em formato de grid responsivo via get


### 2. Detalhes do Produto (Rota: `/produto/:id`)

- Captura o ID do produto usando `useParams()`
- Busca produto por ID na API
- Exibe:
  - Imagem
  - Nome
  - Descrição
  - Preço
  - Estoque
  - Botão "Adicionar ao Carrinho"


### 3. Carrinho (Rota: `/carrinho`)

- Gerenciado globalmente via Context API
- Cada item exibe:
  - Nome
  - Quantidade atual
  - Preço unitário
  - Preço total
  - Estoque máximo permitido
- **Funcionalidades:**
  - Aumentar quantidade (até o limite do estoque)
  - Diminuir quantidade (mínimo 1)
  - Remover item
  - Mostrar total geral da compra


### 4. Cadastro de Produto (Rota: `/cadastro`)

- Formulário com campos:
  - Nome (obrigatório)
  - Descrição (obrigatório)
  - Preço (obrigatório, numérico, ≥ 0)
  - URL da imagem (obrigatório)
  - Estoque (obrigatório, numérico, ≥ 0) <br/>
  O formulario cadastra os produtos no db.json via post

### 5. Edição de Produto (Rota: `/editar/:id`)

- Carrega dados do produto ao abrir a página
- Preenche automaticamente o formulário
- Permite atualizar via PUT


### 6. Página 404

- Rota para páginas não encontradas
- Link para voltar à Home

## 🔧 Hooks Utilizados

### Hooks Obrigatórios

- **useState**: Para estados locais (formulários, dados de produtos, loading, erros)
- **useEffect**: Para chamadas à API e efeitos colaterais
- **useContext**: Para gerenciamento global do carrinho
- **useRef**: Para focar inputs inválidos nos formulários
- **useNavigate**: Para navegação programática
- **useParams**: Para capturar parâmetros da rota

## 🎨 Estilização

A aplicação utiliza **TailwindCSS** para estilização:

- Cards de produtos responsivos
- Páginas responsivas (mobile-first)
- Botões com estados hover e disabled
- Inputs com estados de focus e erro
- Feedback visual de validação
- Layout moderno e limpo

## 📡 Consumo da API (JSON Server)

### Configuração do JSON Server

O JSON Server foi configurado para rodar na porta 3001 e utiliza o arquivo `db.json` como banco de dados.

### Endpoints Utilizados

#### GET `/produtos`
Busca todos os produtos.

**Exemplo de requisição:**
```javascript
fetch('http://localhost:3001/produtos')
```



#### GET `/produtos/:id`
Busca um produto específico por ID.

**Exemplo de requisição:**
```javascript
fetch('http://localhost:3001/produtos/1')
```

#### POST `/produtos`
Cria um novo produto.

#### PUT `/produtos/:id`
Atualiza um produto existente.

#### DELETE `/produtos/:id`
Deleta um produto.

**Exemplo de requisição:**
```javascript
fetch('http://localhost:3001/produtos/1', {
  method: 'DELETE'
})
```



## 🔄 Uso do useContext

### Como o Contexto foi Criado

O contexto do carrinho foi criado usando `createContext` e `useContext` do React:

```javascript
const CartContext = createContext()
```

### Dados Armazenados



### Como o Carrinho é Manipulado

1. **Adicionar ao carrinho**: Verifica se o produto já existe. Se sim, aumenta a quantidade (respeitando estoque). Se não, adiciona novo item.

2. **Aumentar quantidade**: Verifica se a quantidade atual é menor que o estoque antes de aumentar.

3. **Diminuir quantidade**: Verifica se a quantidade é maior que 1 antes de diminuir.

## ✅ Validações Implementadas

### Validações de Formulário

- **Campos obrigatórios**: Todos os campos são validados como obrigatórios
- **Validação numérica**: Preço e estoque devem ser números válidos
- **Validação de valores mínimos**: Preço ≥ 0, Estoque ≥ 0
- **Feedback visual**: Inputs com borda vermelha e mensagens de erro abaixo
- **Foco automático**: `useRef` foca automaticamente no primeiro campo inválido

### Validações de Estoque

- **Adicionar ao carrinho**: Não permite adicionar se estoque = 0
- **Aumentar quantidade**: Bloqueia quando atinge o estoque máximo
- **Mensagens claras**: Exibe mensagens quando limites são atingidos

## 🎬 Fluxo de Navegação

```
Home (/)
  ├── Ver Detalhes → Produto (/produto/:id)
  │     └── Adicionar ao Carrinho → Carrinho (/carrinho)
  ├── Cadastro de Produto → Cadastro (/cadastro)
  └── Carrinho → Carrinho (/carrinho)
        └── Continuar Comprando → Home (/)

Editar Produto (/editar/:id)
  └── Atualizar → Home (/)

404 (*)
  └── Voltar para Home → Home (/)
```

## 👨‍💻 Desenvolvido por

Projeto desenvolvido por Lucas Carlos e Guilherme Selau.

