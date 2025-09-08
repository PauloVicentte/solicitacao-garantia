# Solicitação de Garantia

## Descrição do Projeto

Este projeto foi desenvolvido como parte do Plano de Desenvolvimento Individual (PDI) e tem como objetivo criar uma **interface web simples para solicitação de garantia de aparelhos eletrônicos**, integrada ao **Camunda BPM** para orquestração dos processos de negócio.

O sistema permite que usuários registrem solicitações de garantia, acompanhem o status das solicitações e visualizem detalhes do processo, enquanto o Camunda gerencia o fluxo automatizado, decisões e validações.

---

## Funcionalidades

- **Interface Angular funcional**:
  - Tela de Login
  - Tela Home
  - Formulário de Solicitação de Garantia
  - Acompanhamento das solicitações com status e detalhes em modal
- **Integração com Camunda BPM**:
  - Orquestração de processos de garantia
  - Aplicação de regras de negócio via DMN
  - Atualização automática das solicitações em tempo real
- **Notificações e feedback** para usuário:
  - Solicitações aprovadas, em análise ou negadas
  - Detalhes da solicitação exibidos em modal
- **Validações de dados do cliente e do aparelho**:
  - CPF, nota fiscal, modelo e marca
  - Garantia aplicada apenas para aparelhos elegíveis

---

## Estrutura do Projeto


## Dados de Teste

| Nome          | CPF           | Data Nasc. | Celular        | Gênero    | Marca    | Modelo       | Nota Fiscal | Data Compra |
|---------------|---------------|------------|----------------|-----------|----------|-------------|-------------|-------------|
| Antonio Silva | 123.456.789-00| 15/05/1990 | (11) 99999-1111| Masculino | Samsung  | Galaxy S21  | 123456789   | 21/12/2024  |
| Maria Souza   | 987.654.321-00| 22/03/1985 | (21) 98888-2222| Feminino  | Apple    | iPhone 13   | 321654987   | 19/05/2025  |

---

## Aprendizados

- Modelagem de processos e decisões no Camunda BPMN e DMN.
- Criação de uma interface Angular simples e funcional.
- Integração com Camunda.
- Validações de dados do cliente e do aparelho.

---

## Próximos Passos

- Adicionar testes automatizados para regras DMN.
- Melhorar interface e responsividade.
- Implementar autenticação mais robusta.
- Expandir integração com APIs externas.

---
## Screenshots

Login
<img width="1915" height="915" alt="login" src="https://github.com/user-attachments/assets/f654c3dd-3c07-49b8-9526-97b26898bb00" />

Solicitação
<img width="1908" height="908" alt="solicitação" src="https://github.com/user-attachments/assets/5b7c93eb-fe34-422c-bb26-70ca76e79860" />}

Acompanhar Solicitação
<img width="1915" height="922" alt="acompanhar" src="https://github.com/user-attachments/assets/f55533c8-7a88-4654-b784-1e42c1770c59" />

Dark
<img width="1903" height="916" alt="dark" src="https://github.com/user-attachments/assets/a23f3f6d-9015-4c83-8e58-010421cc9459" />








