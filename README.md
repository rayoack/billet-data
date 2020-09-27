# Billet Data - API 💸

## Rodando o projeto

> Baixe ou clone este repositório.

> Acesse a raiz do projeto por um console e execute:

- `yarn add ou npm i` para instalar as dependências do projeto
- `yarn dev ou npm run dev` para rodar a aplicação

## Sobre o projeto: 📃

O Billet Data é uma API feita em Node.js, na qual o usuário consegue visualizar alguns dados de um boleto após enviar a linha digitavel do mesmo.

## Endpoints: 🛣️

- #### POST /billet
    #####
        Retorna o código de barras, a data de vencimento e o valor do boleto.
    ##### Parâmetros de entrada:
    | Nome  | Obrigatório  |  Exemplo de valor |  Descrição | Tipo de conteúdo do parâmetro |
    |:---:|:---:|:---:|:---:|:---:|
    | digitableLine  | Obrigatório  | "34191.79001 01043.510047 91020.150008 5 83900000026000"  |  Parâmetro obrigatório com o valor sendo uma STRING com os números da linha digitavel de títulos bancários e pagamentos de concessionárias podendo conter espaços e pontos. | application/json

    ##### Resposta:
        {
          "barCode": "34195839000000260001790001043510049102015000",
          "dueDate": "26/9/2020",
          "value": "R$260.00"
        }

## Frameworks e Tecnologias Utilizadas: 🌌

### Backend: 💾

- <strong>Node.Js</strong> e o Framework <strong>Express.Js</strong>