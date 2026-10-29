# Clínica Crescer · Site institucional

Site institucional da Clínica Crescer, uma clínica multidisciplinar de desenvolvimento infantil.

**Stack:** Vite 6 · React 18 · TypeScript · Tailwind CSS 4 · componentes no padrão shadcn/ui (Radix) · Motion · Lucide.

## Requisitos

- **Node.js 18.18 ou superior** (recomendado: 20 LTS, ver `.nvmrc`).
  A máquina de desenvolvimento original tem o Node 14, que **não** é compatível. Com o nvm-windows:
  `nvm install 20` e depois `nvm use 20`.

## Comandos

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm run build      # checagem de tipos + build de produção em dist/
npm run preview    # serve o build de produção em http://localhost:4173
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Contatos, redes, equipe, galeria, depoimentos, foto do hero | `src/config/site.ts` |
| Especialidades (textos, ícones, cores) | `src/config/specialties.ts` |
| Textos institucionais, FAQ, jornada, menu | `src/config/content.ts` |
| Cores, fontes e demais tokens visuais | `src/index.css` (bloco `@theme`) |
| Logotipo (provisório, tipográfico) | `src/components/brand/logo.tsx` |
| Título, descrição e Open Graph | `index.html` |

Procure por **`PENDENTE`** nos arquivos de configuração para ver o que a clínica ainda precisa fornecer.
Campos vazios fazem o site esconder automaticamente o que depende deles. Nada fictício é exibido.

### Comportamentos que dependem da configuração

- **WhatsApp** (`site.contact.whatsapp`): ativa o botão flutuante, o link no rodapé e o envio do formulário pelo WhatsApp.
- **Formulário**: envia por um serviço de formulário (ex.: Formspree) se `site.formEndpoint` ou a variável
  `VITE_FORM_ENDPOINT` estiver definida. Caso contrário, envia pelo WhatsApp. Sem nenhum dos dois, o envio
  fica desativado e o formulário avisa o visitante.
- **Galeria**: aparece somente quando `site.gallery` tiver fotos.
- **Depoimentos**: aparecem somente quando `site.testimonials` tiver depoimentos reais. Sem eles, é exibido
  o bloco de acolhimento.
- **Dados estruturados (schema.org)**: são gerados apenas quando domínio, WhatsApp e endereço estiverem preenchidos.

## Publicação

O build gera arquivos estáticos em `dist/` com caminhos relativos (`base: './'`), compatíveis com Vercel,
Netlify, GitHub Pages ou qualquer hospedagem estática.

Ao definir o domínio oficial:
1. preencha `site.url` em `src/config/site.ts`;
2. em `index.html`, adicione `<link rel="canonical">` e `og:url`, e troque `og:image` por uma URL absoluta
   (ex.: `https://seudominio.com.br/og-image.png`).

## Estrutura

```
src/
  config/        dados institucionais e textos
  components/
    ui/          componentes base (button, accordion, dialog, marquee, spotlight-card, reveal...)
    layout/      header, footer, botões flutuantes
    sections/    seções da página
    brand/       logotipo
    seo/         dados estruturados
  hooks/         rolagem e seção ativa
  lib/           utilitários
public/          favicon, imagem de Open Graph e fotos
```

## Fontes

Bricolage Grotesque e Figtree, ambas sob licença SIL Open Font License (uso comercial livre), servidas
localmente via Fontsource. A Clash Grotesk e a TT Hoves (trial) do template antigo deixaram de ser usadas
por falta de licença verificável para uso comercial.

## Versão anterior

O template original está preservado no git, na tag `legacy-template-v1` e na branch `backup/legacy-template`.
