# 🛠️ Decisões de refatoração

[← Voltar ao README](../README.md)

## 🛠️ Estado atual

A refatoração modular foi publicada em 29/10/2026. O ponto de entrada `js/main.js` inicializa módulos específicos para menu, abas, imagens, animações e equipe. O transporte HTTP, a validação da resposta do GitHub e a apresentação no DOM têm responsabilidades separadas.

O projeto mantém HTML, CSS e JavaScript puro, sem dependências de aplicação. Convenções: identificadores técnicos em inglês; `camelCase` para funções e variáveis; `PascalCase` para tipos JSDoc; `UPPER_SNAKE_CASE` para configurações fixas; `kebab-case` para arquivos compostos e BEM no CSS. Interface e documentação da equipe permanecem em português; comentários técnicos e JSDoc usam inglês.

## 🕰️ Conciliação do plano anterior

O plano inicial de refatoração, registrado em `1fea162`, antecede a implementação modular. Seu diagnóstico e suas propostas não representam uma lista obrigatória de tarefas atuais.

| Proposta anterior | Decisão atual |
| --- | --- |
| Separar o JavaScript concentrado na entrada | Implementado com módulos ES; `main.js` apenas inicializa os módulos. |
| Dar nome específico ao cliente da API | Cliente em `js/api/github.js`; normalização em `utils/normalizeGithubProfile.js`. |
| Padronizar nomes e organizar CSS | Implementado; valores, cascata, breakpoints, foco e movimento reduzido preservados. |
| Reduzir duplicação documental | README orienta execução e navegação; requisitos, testes, API e publicação têm documentos próprios. |
| Migrar build e servidor para Vite | Adotado. O Vite executa desenvolvimento, build e preview; veja [Decisões técnicas](technical_decisions.md). |
| Mover imagens para `public/` ou remover `pages/` | As imagens ficam em `public/img/` e são copiadas para o pacote pelo Vite. A estrutura atual está no [README](../README.md). |
| Remover OpenAPI e Insomnia | Não adotado. Ambos documentam e permitem consultar a integração externa do GitHub. |
| Substituir os testes nativos por Vitest e adicionar Playwright | Adotado. Vitest cobre testes unitários, integração e pacote; Playwright cobre E2E em Chromium e Firefox. Veja [Testes](testing.md). |
| Remover verificações de login, tipos e URLs da API | Não adotado. As verificações continuam necessárias para preservar o contrato e rejeitar respostas incompatíveis. |
| Adicionar lint, typecheck, cobertura mínima e novos comandos ao CI | Propostas futuras, sem critério obrigatório de adoção. Avaliar somente diante de necessidade concreta. |

## 🛠️ Critérios de manutenção

- Manter a estrutura-base e os caminhos relativos compatíveis com GitHub Pages em subdiretório e Netlify.
- Preservar a licença da Inter em `css/fonts/LICENSE-Inter.txt` e sua inclusão no pacote.
- Não adicionar formulários, novas APIs ou funcionalidades clínicas sem requisito de produto.
- Remover somente código ou recursos comprovadamente sem uso; preservar o histórico de decisões e as evidências relevantes.
- Para alterações documentais, verificar links, diff e whitespace; para alterações funcionais, executar os testes afetados e os checks obrigatórios de integração.

Os resultados da refatoração estão no [histórico de alterações](changelog.md). O comportamento da API está descrito em [api.md](api.md); a execução dos testes, em [testing.md](testing.md).
