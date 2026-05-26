Testes Insomnia para Sistema de Aluguel de Equipamentos de Som

alguns dos executados:

Equipamento:

POST /equipamentos
GET /equipamentos/
GET /equipamentos/1
PUT /equipamentos/1
   body:
   {
  "nome": "Caixa JBL Atualizada",
  "descricao": "Nova descrição",
  "valorHora": 70
}
DELETE /equipamentos/1


Alugueis:

POST /alugueis
GET /alugueis/
GET /alugueis/1
PUT /alugueis/1
DELETE /alugueis/1
