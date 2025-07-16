# Cabins-in-the-Woods-Front

Frontend para gestão e administração de cabanas, hóspedes, reservas e funcionários. Interface moderna e conectada à API RESTful.

## Para que serve?

Permite:

- Visualizar e analisar reservas, ocupação e receitas em dashboards
- Gerenciar reservas, hóspedes, cabanas e funcionários
- Realizar login seguro e manter sessões autenticadas
- Interagir com a API documentada do backend

## Principais Tecnologias

- React + Vite
- React Router
- React Query
- Axios
- Styled Components / CSS Modules
- Yup (validações)
- React Hot Toast (notificações)

## Instalação Rápida

1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd Cabins-in-the-Woods-Front
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` com a URL da API backend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

```
src/
  App.jsx           # Componente principal
  main.jsx          # Entry point
  assets/           # Imagens e recursos
  context/          # Contextos globais
  features/         # Lógica de domínio (bookings, cabins, guests, workers)
  hooks/            # Custom hooks (ex: useLogin, useDashboardBookings)
  pages/            # Páginas principais (Dashboard, Bookings, etc)
  services/         # Serviços de API (apiAuth, apiBookings, ...)
  styles/           # Estilos globais
  ui/               # Componentes reutilizáveis
  utils/            # Utilidades
  validations/      # Schemas Yup
public/
  ...               # Imagens públicas
```

## Funcionalidades

- Login/logout de funcionários
- Dashboard com KPIs de reservas, receitas, ocupação
- CRUD de reservas, hóspedes, cabanas e funcionários
- Validação de formulários
- Notificações de sucesso/erro
- Design responsivo

## Requisitos

- Node.js >= 18
- Backend Cabins-in-the-Woods rodando e acessível

## Licença

MIT
