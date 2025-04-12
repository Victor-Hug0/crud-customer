# ecommerce

## Pré-requisitos:

1. Git
2. Node 23
3. Docker (Baixe o docker desktop para windows/wsl)
4. npm

Siga esses passos:

```sh
git clone https://github.com/Victor-Hug0/ecommerce.git

cd ecommerce

npm i
```
## Configurações

Crie um arquivo .env e adicione as seguintes variáveis:

1. DATABASE_URL
2. POSTGRES_USER
3. POSTGRES_PASSWORD
4. POSTGRES_DB

Após isso, execute os seguintes comandos:

```sh
docker compose up -d

npm run dev
```