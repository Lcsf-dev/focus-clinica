# 🎨 Design — Focus Clínica

[← Voltar ao README](../README.md)

## 🎨 Apresentação atual do produto

O hero combina o título “Mais organização. Mais foco no cuidado.”, o médico inteiramente fictício, a captura real da visão geral e dois cartões de exemplos demonstrativos. O fundo menta, as formas suaves e a composição em camadas dão profundidade sem transformar textos e ações em uma imagem. A indicação de personagem ilustrativo acompanha a composição.

Uma faixa compacta mostra quatro telas e seis especialidades efetivamente presentes nas capturas. As funcionalidades usam uma grade assimétrica: calendário e agendamentos em destaque e blocos complementares de avisos, especialidades e configurações. Os recortes provêm das imagens originais, com indicação de dados demonstrativos.

A galeria mantém quatro abas por clique e teclado. Cada painel reúne explicação, recursos destacados e uma prévia em recorte, com dimensões reservadas para manter a altura estável. A ampliação abre o PNG completo, oferece tamanho original, fecha por Escape e devolve o foco ao acionador.

As entradas reutilizam o mecanismo de `IntersectionObserver`, com intervalos curtos entre os elementos. Os cartões sobrepostos fazem um único movimento de 3,4 segundos. Abas usam uma transição de 250 ms, sem carrossel automático. `prefers-reduced-motion` mostra os estados finais e desativa os movimentos. Sem JavaScript ou sem suporte ao observador, o conteúdo permanece visível; falhas ao configurar o observador também restauram a visibilidade.

O cabeçalho compacto, as oito partes institucionais, a FAQ e os créditos integrados ao GitHub são preservados. No celular, a composição fica após os textos e botões, com médico e captura visíveis; a grade de funcionalidades vira uma sequência de blocos. Benefícios mantêm o fundo petróleo, a FAQ ocupa menos espaço e a chamada final reforça o acesso ao sistema.

Logo, paleta e Inter local com licença são preservados. Os PNGs originais permanecem sem alterações. Origem e dimensões dos novos ativos estão em [Recursos visuais](images.md).

## 🕰️ Histórico do protótipo

Os registros abaixo descrevem as versões anteriores e suas revisões específicas.

**Revisão visual: Thamires (`thaamiresffranca`) — aprovado em 20/10/2026.**

Responsável pelo design: Lucas Fernandes (`Lcsf-dev`). A aprovação visual registrada é específica do protótipo de 20/10/2026 e distinta da validação da implementação.

## 🧪 Conferência de 30/10/2026

As oito partes da página foram comparadas com os layouts de 1440, 768 e 390 px da página “02 — Layouts e protótipo”. A paleta, a tipografia e os botões foram conferidos na página “03 — Estilos e revisão”. O protótipo permite rolagem vertical além do recorte inicial do quadro desktop. A [evidência da identidade](evidence/figma-original-logo.png) registra a versão anterior.

A implementação usa captura reta no hero, marca em uma linha, seção Sobre clara, benefícios em fundo petróleo e chamada para ação em menta. Textos, cartões com ícones, abas, botões e créditos seguem a composição dos layouts. No tablet, o menu ocupa uma segunda linha; no celular, o botão de acesso permanece visível e a navegação usa um menu expansível.

Permanecem adaptações funcionais: cabeçalho fixo durante a rolagem, diálogo acessível de ampliação, indicadores de foco e estados da API. Nomes e avatares podem variar conforme os perfis públicos do GitHub; a mensagem de estado acrescenta altura ao rodapé. Os ícones são vetores locais e a quebra de linhas varia com a área útil do navegador. A comparação visual não constitui uma medição pixel a pixel nem altera a aprovação histórica do protótipo. Cenários verificados e limitações estão em [Testes](testing.md).

## 🔗 Arquivo e apresentação

- [Arquivo editável no Figma Design](https://www.figma.com/design/P7K5fBiCqhBsehhrR5BNqp/).
- [Protótipo — computador](https://www.figma.com/proto/P7K5fBiCqhBsehhrR5BNqp/?node-id=2-12730&starting-point-node-id=2%3A12730&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1).

| Página | Conteúdo |
| --- | --- |
| 01 — Wireframes | Estrutura das oito seções em computador 1440 px, tablet 768 px e celular 390 px |
| 02 — Layouts e protótipo | Três layouts com Auto Layout, textos editáveis, capturas reais e fluxos de apresentação |
| 03 — Estilos e revisão | Paleta, tipografia, componentes reutilizáveis, estados e registro visual |

## 🎨 Telas e navegação

Cada layout contempla cabeçalho, hero, sobre, funcionalidades, benefícios, demonstração, chamada para ação e rodapé. Existem estados separados para acesso do cliente e captura ampliada.

Foram configurados três fluxos com rolagem vertical. No computador, o menu navega para as quatro seções; o botão de acesso abre o sistema de referência. A demonstração tem conexão para a tela de acesso e ampliação da captura, com fechamento da sobreposição.

O protótipo apresenta o visual e os fluxos principais. A execução de fetch, a navegação completa por teclado e a responsividade efetiva são verificadas na implementação HTML/CSS/JavaScript, não deduzidas das telas do Figma.

## 🎨 Identidade e recursos

| Recurso | Definição |
| --- | --- |
| Petróleo | `#123F40`, `#102F32` |
| Verde | `#16765C` |
| Menta | `#B9F2D5` |
| Branco / fundo claro | `#FFFFFF`, `#F8FBF9` |
| Tipografia | Inter no protótipo e no site; fonte variável WOFF2 hospedada em css/fonts, com licença SIL Open Font License |
| Organização | Auto Layout, camadas em português, cartões e botões reutilizáveis |
| Capturas reais | Apresentação pública e acesso do Focus Clínica; origem registrada em [docs/images.md](images.md) |
| Marca | Logo original usado pelo sistema de referência, preservado em `public/img/logo-focus-clinica.png`; origem em [docs/images.md](images.md) |

Os créditos contemplam os quatro perfis públicos da equipe, com estados de carregamento, sucesso e falha no material de estilos. Não foram criadas imagens fictícias de agendas, pacientes ou telas internas.

Em 20/10/2026, o logo original da referência foi aplicado aos cabeçalhos e rodapés dos três layouts do Figma e ao site. A Inter foi incluída localmente a partir do [repositório oficial](https://github.com/rsms/inter), com sua licença em css/fonts/LICENSE-Inter.txt. [Evidência do Figma atualizado](evidence/figma-original-logo.png).

## 📝 Registro da revisão

| Campo | Registro |
| --- | --- |
| Versão | Layouts e protótipo de 20/10/2026 |
| Responsável pelo design | Lucas Fernandes |
| Revisora visual | Thamires (`thaamiresffranca`) |
| Estado | Aprovado |
| Data | 20/10/2026 |

A implementação começou antes da conclusão do Figma. Ajustes futuros no conteúdo, marca ou layout devem ser registrados e conferidos sem alterar retroativamente as datas ou a revisão dessa versão.
