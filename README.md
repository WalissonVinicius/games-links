# 🎮 Games Links

Catálogo leve e responsivo com **links de jogos on-line**, organizado por categorias e plataformas.

🔗 **Demo:** https://www.jogos.walisson.dev  
📦 Stack: **Next.js**, **TypeScript**, **Tailwind CSS**, **(opcional) Sanity CMS**

## ✨ Recursos
- Lista de jogos com **busca** e **filtros** por tags/plataformas  
- Páginas estáticas rápidas (Next.js)  
- UI responsiva e acessível  
- (Opcional) Conteúdo via **Sanity** (`sanity-schema.js`)

## 🚀 Rodando localmente
```bash
# Requisitos: Node 18+
npm install
npm run dev
# http://localhost:3000


Variáveis de ambiente (se usar Sanity)
SANITY_PROJECT_ID=...
SANITY_DATASET=production
SANITY_API_VERSION=2023-10-01

🛠️ Scripts

dev — ambiente de desenvolvimento

build — build de produção

start — servir build (quando aplicável)

☁️ Deploy

Recomendado: Vercel (detecta Next.js automaticamente)

📄 Licença

MIT
