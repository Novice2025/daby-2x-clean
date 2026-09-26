# VDABY.COM — Relatório de Discovery, SEO e Visibilidade em IA
Data: 2026-09-24 · Base: ZIP do site em produção + pesquisas reais de SERP (PT-BR e EN) nesta data.

## 1. O que o site JÁ faz bem
- Site estático (conversão React→HTML estático concluída): o conteúdo textual está no HTML, visível a crawlers e bots de IA sem JavaScript. Este era o maior risco de sites assim e já está resolvido.
- Título + meta description em 100% das páginas auditadas (11 páginas).
- Canonical por página, hreflang pt-BR + x-default, OG e Twitter cards completos.
- JSON-LD rico: Organization/EducationalOrganization, Person (Vishul Daby, com knowsAbout e sameAs → LinkedIn), WebSite, WebPage, BreadcrumbList, FAQPage (home), Course, BlogPosting nos artigos.
- robots.txt aberto a Google, Bing, GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, Meta, Amazonbot, CCBot — com sitemap declarado. Exatamente o que a visibilidade em IA exige.
- llms.txt + llms-full.txt implementados (convenção llms.txt), incluindo página /ai-discovery/ factual sobre a marca.
- sitemap.xml completo com imagens; alt text em 100% das imagens verificadas; .htaccess de cache para /assets/.
- Página corporativa (/corporate/) com BreadcrumbList; blog com 3 artigos posicionados ("Stop Operating in English", "O paradoxo brasileiro", "Comunicação Estratégica 2X").

## 2. O que limitava a descoberta (antes desta entrega)
- Só existiam 11 páginas para cobrir um universo de dezenas de buscas. A query "inglês para profissionais" — a maior do segmento — não tinha uma página própria: a home fala "inglês para trabalho e reuniões", mas não existe uma URL que o Google possa ranquear especificamente para esse termo.
- Nenhuma página em inglês voltada a quem busca em EN (business English Brazil, English for professionals Brazil). O site declara hreflang x-default em PT.
- Ausência (verificada por pesquisa) de menções externas com atributos que ranqueiam: o site aparece no Crunchbase, mas não em listagens/diretórios do segmento, e o perfil LinkedIn do fundador precisa citar vdaby.com com anchor text.

## 3. Gap analysis — quem aparece hoje (pesquisa real, 2026-09-24)
| Busca | Quem aparece | Tipo de página | O que eles têm | Situação da Daby |
|---|---|---|---|---|
| inglês para profissionais | EC English, EF Corporate, LSI, CCAA | landing institucional | domínio + conteúdo específico por intenção | SEM página dedicada → criada /english-for-professionals/ |
| inglês para executivos | ceoingles.com.br, rodrigofaria.com, Lingualize, English Camp, Richards | landing de serviço c/ telefone na página | especialização explícita + CTA direto | SEM página dedicada → criada /executive-english/ |
| inglês corporativo para empresas | englishforbusiness.com.br, Cultura Inglesa Empresas, CCAA, EF | landing B2B | prova social + programas nomeados | /corporate/ existe — reforçada com cross-links |
| inglês para reuniões de trabalho | Preply (blog), Nacaofluente, i12speakenglish, TopWay | artigo/landing de cauda | conteúdo focado na situação | SEM página dedicada → criada /english-for-meetings/ |
| business English Brazil | besbrazil.com, Braz-TESOL, EF, englishforbusiness.com.br | landing EN/PT | conteúdo em inglês | SEM página dedicada → criada /business-english/ |
| English for professionals Brazil / teaching professional English in Brazil | resultados de TEFL/recrutamento (gooverseas, tefl.org, reddit) — pouca oferta de treinamento | — | quase ninguém ataca a intenção "treinar profissionais brasileiros" | MAIOR OPORTUNIDADE — conteúdo em EN planejado (fase 2) |
| inglês para apresentações e negociações | Cambridge School online, BusinessEnglishPod, Preply | artigo/curso ESP | conteúdo de cauda | coberto por seções dentro das páginas novas |

Observação de honestidade: ferramentas de pesquisa não expõem volume de busca; a priorização usa posição de intenção comercial e concorrência observada, não números de volume.

## 4. Arquitetura entregue nesta fase
4 landing pages novas, 100% no template visual existente, com FAQPage JSON-LD e cross-linking:
- /english-for-professionals/ — terme-chefe do segmento (PT)
- /business-english/ — ponte PT↔EN
- /executive-english/ — maior ticket, intenção comercial alta (PT)
- /english-for-meetings/ — cauda com concorrência fraca em landing dedicada
Links internos: rodapé de todas as páginas + seção "Explore também" + links de contexto nos textos.

## 5. Plano de entidade (Google precisa entender "quem é Daby")
- Já existe: Organization + Person (Vishul Daby) com sameAs LinkedIn. 
- Ações externas (não dependem de código):
  1. Google Business Profile — "Daby — Inglês Estratégico", São Paulo, categorias "English language school"/"Business to business service", site = vdaby.com, posts semanais.
  2. LinkedIn da Daby: headline citando "Business English para profissionais brasileiros · vdaby.com"; publicar as 4 páginas novas como artigos/destaques.
  3. Crunchbase: já existe perfil "Daby Language Platform" — atualizar descrição e link.
  4. Diretórios/citações:_SC, Reclame Aqui, behance/não aplicáveis — priorizar diretórios educacionais BR e guest posts em portais de carreira.

## 6. Visibilidade em IA (ChatGPT, Gemini, Perplexity, Copilot)
- robots.txt já libera GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended — mantido intacto.
- llms.txt e llms-full.txt atualizados com as 4 páginas novas (conteúdo factual, citável).
- FAQPage JSON-LD nas páginas novas alimenta respostas diretas de IA.
- Próximo passo de conteúdo: 1 artigo novo por mês respondendo a uma pergunta real ("como conduzir uma reunião em inglês sem travar") — conteúdo citável é o que IA busca.

## 7. Fases seguintes (fora do escopo do código)
- F2: 1 página em inglês (Business English for Brazilian professionals) + 2 artigos/mês em PT.
- F3: link building via LinkedIn + parcerias + menções em portais de RH/carreira.
- F4: Search Console + Bing Webmaster + IndexNow (Bing/ChatGPT) para indexação acelerada.
