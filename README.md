# 🎬 Cinema da Anny (CinemadeAnny)

Portal de cinema com visual Old Hollywood: filmes, séries, documentários, resenhas, curiosidades e opinião do público.

Site: https://jgfjjoao-afk.github.io/cinemadeanny/

## Arquivos

- `index.html` — página do site
- `app.js` — funcionalidades do site
- `data.js` — conteúdos de exemplo
- `estilo.css` — visual do site
- `sitemap.xml` — endereço público do site para o Google

## Como funciona

- O site é publicado pelo GitHub Pages (branch `main`, pasta raiz).
- O Firebase (Authentication e Cloud Firestore) cuida do login da administradora e guarda os dados do site.
- A área **Admin** exige e-mail e senha de uma conta do Firebase. Nenhuma senha fica guardada neste repositório.
- Quem protege os dados são as regras de segurança do Firestore, configuradas no console do Firebase.

## Como atualizar pelo celular

1. Abra o repositório no navegador e toque em **Add file → Upload files**.
2. Envie os arquivos com os mesmos nomes (`index.html`, `app.js` etc.) para substituí-los.
3. Toque em **Commit changes** e espere 1 a 2 minutos.
