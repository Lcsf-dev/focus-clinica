# 🌐 CI/CD e publicação

[← Voltar ao README](../README.md)

## 🌐 Produção

**Site atual:** <https://focusclinica.netlify.app/>.

> 🕰️ O endereço `https://lcsf-dev.github.io/focus-clinica/` disponibiliza uma versão antiga. Use o Netlify para acessar a página atual.

O Netlify acompanha `main`, executa `npm run build` e publica `dist/`, conforme `netlify.toml`. A URL canônica, os metadados Open Graph e Twitter e a imagem social usam o endereço atual.

O sistema em <https://focus-clinica.netlify.app/> é uma aplicação externa. A landing page apenas oferece seu link de acesso.

No repositório [Lcsf-dev/focus-clinica](https://github.com/Lcsf-dev/focus-clinica), o campo **About → Website** deve apontar para `https://focusclinica.netlify.app/`.

## 🔄 GitHub Actions

O workflow `.github/workflows/ci.yml` valida PRs e pushes em `develop` e `main`, com Node.js 22 e ações fixadas por commit:

1. `npm ci`.
2. `npm test` para os projetos unitário e de integração do Vitest.
3. `npm run test:build` para gerar `dist/` e testar o pacote.
4. Instalação dos navegadores Chromium e Firefox do Playwright.
5. `npm run test:e2e` para a suíte nos dois navegadores.

O workflow atual não publica no GitHub Pages; seu endereço anterior e seus registros permanecem no histórico. A publicação no Netlify é automática após a integração em `main`. A conferência de uma entrega deve comparar o SHA de `main` com o commit do deploy publicado no Netlify, além de verificar brevemente a página pública.

## 🌐 Integração e pacote público

Branch da tarefa criada a partir de `origin/develop` → PR para `develop` → checks → merge → PR para `main` → checks → merge. Não enviar diretamente às branches principais, reescrever histórico ou contornar proteções.

O Vite gera o HTML, CSS e JavaScript de produção e copia as imagens de `public/`. Documentação, testes, credenciais e arquivos temporários ficam fora do pacote. `netlify.toml` preserva a CSP, X-Content-Type-Options, Referrer-Policy e X-Frame-Options. A CSP permite a API pública do GitHub e os avatares no domínio esperado.

## 🕰️ Histórico de publicação

O GitHub Pages foi usado anteriormente em `https://lcsf-dev.github.io/landing-page-focus-clinica/` e, após a mudança do nome do repositório, em `https://lcsf-dev.github.io/focus-clinica/`. Esses endereços são históricos; a publicação atual fica no Netlify.

Os registros datados abaixo preservam os endereços usados nas respectivas publicações.

| Data | Versão | Registro |
| --- | --- | --- |
| 20/10/2026 | `a5569fe` | Publicação inicial no Pages e depois no Netlify; [workflow](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/39421037690) e [deploy Netlify](https://app.netlify.com/projects/landing-page-focus-clinica-lcsf/deploys/6ad75c448744501e4d0ddb7a). |
| 29/10/2026 | `13edfc0` | Refatoração publicada com 22 testes no [workflow](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40937911844). |
| 29/10/2026 | `8b8ba58` | Finalização publicada com 26 testes e correção de foco; [workflow](https://github.com/Lcsf-dev/landing-page-focus-clinica/actions/runs/40945562687). |

Evidências iniciais: [Pages](evidence/github-pages-deployment.png) e [Netlify](evidence/netlify-deployment.png). Cenários e limites de verificação em [Testes](testing.md). A limpeza documental integrada apenas em `develop` não altera a produção.
