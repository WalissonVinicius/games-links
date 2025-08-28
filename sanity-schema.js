// Schema para Sanity Studio
// Arquivo: schemas/gameLink.js

export default {
  name: 'gameLink',
  title: 'Game Link',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título do Jogo',
      type: 'string',
      validation: Rule => Rule.required().max(100).error('Título é obrigatório e deve ter no máximo 100 caracteres')
    },
    {
      name: 'url',
      title: 'URL do Link',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https'],
        allowRelative: false
      }).error('URL válida é obrigatória')
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url'
    }
  }
}

/*
Para configurar o Sanity Studio:

1. Instale o Sanity CLI: npm install -g @sanity/cli
2. Crie um novo projeto: sanity init
3. Adicione este schema no arquivo schemas/gameLink.js
4. Importe no arquivo schemas/index.js:
   
   import gameLink from './gameLink'
   
   export default [gameLink]

5. Configure as variáveis de ambiente:
   NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
   NEXT_PUBLIC_SANITY_DATASET=production

6. Deploy do studio: sanity deploy
*/