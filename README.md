# Projax — Landing Page

Landing page do Projax, ERP de gestão para escritórios de arquitetura.
Construída com **Vite + React + TypeScript**, **Tailwind CSS v4** e animações em
**GSAP** (ScrollTrigger, Flip, Draggable) com scroll suave via **Lenis**.

> O sistema do Projax é privado e está em fase de testes com usuários. Este repositório contém apenas a landing page, que está no ar em [projax.com.br](https://projax.com.br).

## Requisitos

- Node.js 20+
- npm

## Como rodar

```bash
git clone <url-do-repositorio>
cd projax
npm install
npm run dev        # desenvolvimento em http://localhost:5173
```

## Scripts

| Comando           | Descrição                                |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento (Vite + HMR) |
| `npm run build`   | Type-check (`tsc`) + build de produção   |
| `npm run preview` | Pré-visualiza o build de produção        |
| `npm run lint`    | ESLint                                   |

## Estrutura

```
src/
  sections/     Hero, Features, HowItWorks, Pricing, FAQ, CTA
  components/   Nav, Footer, ProjectTasksBoard, FeatureIcons, ...
  lib/gsap.ts   registro central do GSAP
  hooks/        useMobileAccordion
  index.css     tokens de design (Tailwind v4) + utilitários
public/         assets estáticos (logos, imagens dos passos em .webp)
```

---

Desenvolvido por [XPR Studios](https://xprstudio.com).
