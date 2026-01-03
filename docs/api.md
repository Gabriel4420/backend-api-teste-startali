# 📚 Documentação da API de Usuários

Bem-vindo à documentação da API do projeto `backend-api-teste-startali`. Abaixo você encontrará todos os detalhes para interagir com os endpoints disponíveis.

**URL Base:** `http://localhost:3333`

---

## 🚀 Resumo dos Endpoints

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| 🟢 `GET` | `/users` | Lista todos os usuários cadastrados |
| 🟢 `GET` | `/users/:id` | Retorna os detalhes de um usuário específico |
| 🟡 `POST` | `/users` | Cria um novo usuário |
| 🔵 `PUT` | `/users/:id` | Atualiza os dados de um usuário existente |
| 🔴 `DELETE` | `/users/:id` | Remove um usuário do sistema |

---

## 📖 Detalhes dos Endpoints

### 1. Listar Usuários

Retorna a lista completa de usuários do banco de dados.

- **Método:** `GET`
- **Rota:** `/users`

**Exemplo de Resposta (200 OK):**

```json
{
  "message": "Lista de usuários",
  "users": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@gmail.com",
      "age": 30
    }
  ]
}
```

---

### 2. Obter Usuário por ID

Busca um usuário específico pelo seu ID numérico.

- **Método:** `GET`
- **Rota:** `/users/:id`
- **Parâmetros de URL:**
  - `id` (obrigatório): ID numérico do usuário.

**Respostas Possíveis:**

| Status | Descrição | Exemplo de Corpo |
| :--- | :--- | :--- |
| ✅ `200` | Sucesso | `{"message": "Detalhes do usuário", "user": {...}}` |
| ❌ `404` | Não encontrado | `{"message": "Usuário não encontrado"}` |

---

### 3. Criar Usuário

Adiciona um novo usuário ao sistema. Requer um corpo JSON válido.

- **Método:** `POST`
- **Rota:** `/users`

**Corpo da Requisição (JSON):**

| Campo | Tipo | Obrigatório | Regras | Descrição |
| :--- | :--- | :---: | :--- | :--- |
| `name` | String | ✅ Sim | Mínimo 3 caracteres | Nome completo do usuário |
| `email` | String | ✅ Sim | Formato de e-mail válido | Endereço de e-mail |
| `age` | Number | ✅ Sim | Inteiro positivo (min 1) | Idade do usuário |

**Exemplo de Corpo:**

```json
{
  "name": "Maria Souza",
  "email": "maria@email.com",
  "age": 25
}
```

**Respostas Possíveis:**

| Status | Descrição |
| :--- | :--- |
| ✅ `201` | Usuário criado com sucesso |
| ❌ `400` | Erro de validação (campos inválidos) |

---

### 4. Atualizar Usuário

Atualiza as informações de um usuário existente. Você pode enviar apenas os campos que deseja alterar.

- **Método:** `PUT`
- **Rota:** `/users/:id`
- **Parâmetros de URL:**
  - `id` (obrigatório): ID numérico do usuário.

**Corpo da Requisição (JSON) - Campos Opcionais:**

| Campo | Tipo | Regras |
| :--- | :--- | :--- |
| `name` | String | Mínimo 3 caracteres |
| `email` | String | Formato de e-mail válido |
| `age` | Number | Inteiro positivo (min 1) |

**Exemplo de Corpo (Atualizando apenas o nome):**

```json
{
  "name": "Maria S. Oliveira"
}
```

**Respostas Possíveis:**

| Status | Descrição |
| :--- | :--- |
| ✅ `200` | Usuário atualizado com sucesso |
| ❌ `400` | Erro de validação |
| ❌ `404` | Usuário não encontrado |

---

### 5. Deletar Usuário

Remove permanentemente um usuário do banco de dados.

- **Método:** `DELETE`
- **Rota:** `/users/:id`
- **Parâmetros de URL:**
  - `id` (obrigatório): ID numérico do usuário.

**Respostas Possíveis:**

| Status | Descrição | Exemplo de Corpo |
| :--- | :--- | :--- |
| ✅ `200` | Sucesso | `{"message": "User deleted"}` |
| ❌ `404` | Não encontrado | `{"message": "User not found"}` |
