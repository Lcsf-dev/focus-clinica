# Recursos visuais

Os arquivos ficam em `public/img/` e são publicados em `/img/...` pelo Vite.

| Arquivo | Conteúdo | Dimensões |
| --- | --- | --- |
| `dashboard.png` | Visão geral: consultas, calendário e notificações | 2554 × 1271 px |
| `appointments.png` | Consultas de hoje e realizadas, profissionais, especialidades e status | 2553 × 1263 px |
| `consultation-types.png` | Especialidades e profissionais em cartões | 2548 × 1261 px |
| `settings.png` | Perfil, clínica, preferências e segurança | 2552 × 1256 px |
| `*-preview.png` (quatro telas) | Recortes das capturas para a prévia móvel; a imagem completa permanece no link de ampliação | 600 × 500 px |
| `doctor-hero.webp` | Personagem médico inteiramente fictício em imagem ilustrativa com canal alfa, cerca de 88 KiB | 900 × 1015 px |
| `doctor-hero-small.webp` | Versão responsiva do mesmo personagem, cerca de 36 KiB | 520 × 586 px |
| `dashboard-hero.webp` | Recorte da visão geral sem a grande área vazia inferior | 1400 × 433 px |
| `*-showcase.webp` (quatro telas) | Recortes das áreas de conteúdo para a galeria, com proporções uniformes e de 28 a 46 KiB | 1600 × 600 px |
| `calendar-detail.webp` | Recorte do calendário original para o bloco de funcionalidades | 900 × 307 px |
| `appointments-detail.webp` | Recorte da tabela original com os status das consultas | 900 × 284 px |
| `social-preview.png` | Composição para compartilhamento, com marca original, título e recorte da visão geral | 1200 × 630 px |
| `logo-focus-clinica.png` | Logo original do Focus Clínica, preservado sem alterações | 500 × 500 px |
| `presentation-focus-clinica.jpg` e `login-focus-clinica.jpg` | Capturas anteriores de apresentação e login, preservadas | 2560 × 1271 px |
| `icons.svg` | Ícones vetoriais locais | Vetorial |

As quatro telas internas são capturas originais do Focus Clínica, com dados demonstrativos fictícios. Os PNGs completos foram preservados sem recompressão ou alteração visual. Seu tamanho individual varia de 138 a 219 KiB; os recortes móveis têm de 20 a 27 KiB. A indicação de dados demonstrativos acompanha a galeria e a apresentação inicial.

O logo tem origem no sistema de referência: <https://focus-clinica.netlify.app/assets/focuslogo-DVNGTueR.png>. As duas capturas anteriores têm origem nas telas públicas de apresentação e login em <https://focus-clinica.netlify.app/>.

O personagem é ilustrativo e não representa integrante da equipe ou profissional real da empresa. O PNG de origem permanece preservado; as versões WebP mantêm o canal alfa e reduzem a imagem de 1,46 MB para cerca de 90 KB na versão principal. A escolha responsiva usa `srcset` e reserva as dimensões da imagem.

As interfaces não são recriadas: cores, fontes, proporções, textos e componentes permanecem nas imagens originais. Os recortes móveis não substituem as capturas completas. Dimensões explícitas reservam espaço; a imagem inicial tem prioridade alta e as imagens da galeria usam carregamento tardio.

A Inter variável é servida localmente em WOFF2, com `font-display: swap` e a licença SIL Open Font License preservada em `css/fonts/LICENSE-Inter.txt` e distribuída em `public/licenses/Inter.txt`. O arquivo existente inclui os caracteres do português e não foi substituído ou reduzido.
