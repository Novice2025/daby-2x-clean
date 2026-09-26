# CHANGELOG — Camada de Descoberta (Search & AI) — vdaby.com
Data: 2026-09-24 · Natureza das mudanças: 100% ADITIVA. Nenhum arquivo existente foi removido, renomeado ou teve conteúdo/roteiro alterado.

## Novas páginas (reutilizando o layout existente detail-hero/detail-body)
- /english-for-professionals/  — "Inglês para Profissionais" (PT, termo de maior volume)
- /business-english/           — "Business English para profissionais brasileiros" (PT + EN)
- /executive-english/          — "Inglês para Executivos" (PT, termo com alta intenção comercial)
- /english-for-meetings/       — "Inglês para Reuniões" (PT, cauda específica)
Cada página nova tem: title, meta description, canonical, hreflang (pt-BR + x-default), OG/Twitter,
robots index,follow, JSON-LD (@graph com Organization, WebPage, BreadcrumbList, FAQPage),
3 seções de conteúdo + FAQ + cross-links internos entre as 4 páginas, footer e botões WhatsApp
idênticos ao padrão do site.

## Arquivos existentes atualizados (somente acréscimos)
- sitemap.xml        → 4 URLs novas adicionadas ao final do urlset (nada removido)
- llms.txt           → 4 entradas novas na seção "Official pages"
- Rodapé de TODAS as 10 páginas existentes → 4 links novos adicionados após "AI Discovery"
  (duas linhas de diff por arquivo; nenhum texto, roteiro ou estrutura alterados)

## Não tocado
robots.txt, llms-full.txt, index.php, assets/*, manus-storage/*, 404.html, todo o conteúdo
visível das páginas existentes, caminhos/rotas, HTMLs legados, .well-known, pastas do sistema.

## Validação executada
- JSON-LD das 15 páginas valida como JSON (parse OK)
- Verificação de links internos: 0 links quebrados em todo o site
- Título, description, canonical, H1 presentes em 100% das páginas novas
- Diff contra o ZIP original confirma mudanças apenas nas linhas indicadas acima

## Depois do deploy (responsabilidade do titular do site)
1. Enviar o conteúdo do pacote para public_html/ preservando .well-known, .git e pastas do sistema.
2. Google Search Console: inspeccionar as 4 URLs novas → "Solicitar indexação".
3. Reenviar https://vdaby.com/sitemap.xml em Sitemaps.
4. Publicar os links das páginas novas no LinkedIn (post + seção Destaques do perfil).
5. Criar/atualizar o Google Business Profile (São Paulo, categoria "English language school" /
   "Treinador de negócios") apontando para vdaby.com.
