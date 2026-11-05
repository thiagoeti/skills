---
name: skill-builder
description: Use ao criar skill, revisar, reescrever, analisar, melhorar e corrigir qualquer skill. Cria, reescreve, melhora, enxuga, valida e audita Agents e Skills.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Skill builder

- Frase que não é instrução gasta contexto e dilui a regra.
- **Só entra o que é extremamente útil** — vale para tudo que entra na skill.

## Regras Importantes

- Nunca invente API, flag ou versão.
- Nunca mova nada para `references/` sem linha de roteamento no `SKILL.md`.
- Nunca crie `assets/`.
- Nunca duplique conteúdo entre skills.

## Modelo

- Corpo em seções (não obrigatórias)
- O que importa é ser o mais objetivo possível
- Quanto menos e mais diretivo, melhor
- Evite numeração, se possível

```markdown
---
name / description / version / license          → Frontmatter
---

# <Nome>

## Contexto e Objetivo                  problema em bullets + **Casos de uso:**
## Fluxo Cognitivo (Workflow)           passos numerados
## Regras Estritas de Execução          proibições; nada destrutivo sem confirmação
## Exemplos Práticos (Few-Shot)         só exemplos que passam nos 3 testes; nenhum passa → omita
## Referência Técnica                   informações importantes
## Checklist                            opcional
```

**Esta é uma sugestão, um modelo, mas tudo SEMPRE deve ser feito conforme a necessidade.**

## Cuidado - Dividir

Não use divisão por tamanho ou padrão. Use apenas quando:

- Skills do mesmo grupo ou assunto crescem;
- Várias skills cobrem o mesmo assunto, devemos unificar;
- Uma skill se tornou híbrida demais.

Pode sugerir um prefixo:

- Uma skill por assunto, prefixo comum (`vsa-architecture`, `vsa-test`).
- Skill índice com o prefixo curto (`vsa`): tabela *Skill → Responde → Abra ao*.

## Description

```
Use quando <gatilho>, <palavra-chave>, <gatilho>, <palavra-chave>. Pequeno resumo do que faz.
```

| ✅ | ❌ |
|---|---|
| Frases e queixas que o usuário digita: "subir o código", "ficou lento" | Só jargão: "deploy" |
| Contexto que chama sem a palavra-chave: "ao criar arquivo TypeScript" | Só a palavra-chave — subdispara |
| Verbo e objeto exatos | Gatilho genérico — dispara em caso alheio |
| Uma frase no fim, 3ª pessoa: "Nomeia…" | "Você deve…"; regra do corpo |
| Só o que a skill faz | Fronteira com a vizinha — vai em `## Externas` |
| Gatilho só na `description` | "Quando usar" no corpo |

Teste: 5 prompts em sessão limpa — 3 disparam, 2 não. Errou → corrija pela tabela e repita.

## Classificação

É instrução se:

- fixa valor exato — caminho, arquivo, coluna, limite, comando;
- define formato de saída;
- impõe ordem ou pré-requisito;
- proíbe algo;
- diz quando acionar ou qual ramo seguir;
- registra armadilha vista na prática.

Nenhum → sai. Passou → ainda passa pelos testes de corte.

## Nunca

- Apague instrução, mas pode melhorar e encurtar.
- Invente API, flag ou versão.
- Mova nada para `references/` sem linha de roteamento no `SKILL.md`.
- Crie `assets/`.
- Duplique conteúdo entre skills.

## Testes de corte

**Apague a frase que reprovar:**

- **Corte** — sem ela, o agente faz igual.
- **Novidade** — o agente já sabe.
- **Decisão** — adjetivo sem critério; troque por critério ou apague.
- **Unicidade** — fato repetido; fica só perto do uso.
- **Forma** — comparação, casos ou mapeamento em prosa; vire tabela.

**Corte tudo que não for realmente útil e que possa ser reduzido sem perder o sentido.**

## Perfumaria

SEMPRE apague:

- introdução, propósito;
- persona, tom, educação;
- motivo com mais de meia linha;
- enchimento: "simplesmente", "basicamente", "é importante notar", "vale lembrar";
- metatexto, conclusão, elogio a tecnologia;
- emoji decorativo — `✅`/`❌` só como marcador;
- tempo relativo: "recentemente", "hoje", "na versão nova";
- instalação e boilerplate — fica a linha que decide, o resto vira `// ...`.

## Voz

Escreva:

- imperativo, uma ação por linha — nunca "é importante", "recomenda-se";
- regra com a consequência;
- `Se X → Y`;
- par entrada → saída;
- um termo por coisa;
- seção pelo nome — nunca `§N`;
- só o que a skill faz — nunca bloco "Não cobre";
- código pela taxonomia da linguagem (`ts-taxonomy`, `php-taxonomy`);
- passo frágil: comando exato e "não altere";
- passo aberto: 3–5 bullets de direção;

## Estrutura

```
skill-name/
├── SKILL.md            obrigatório
├── references/*.md     só em skill interna (.claude/skills/), 1 nível
└── scripts/            só lógica determinística
```

Em `skills/`: só `SKILL.md` e `scripts/`. Referência acima de 300 linhas começa com sumário.

## Frontmatter

Frontmatter de `skills/<nome>/SKILL.md`: 4 campos obrigatórios e `model` opcional, nenhum outro.

| Campo | Regra | ✅ | ❌ |
|---|---|---|---|
| `name` | `^[a-z0-9-]+$`, igual à pasta, até 64 caracteres, sem `claude` nem `anthropic` | `web-seo` em `skills/web-seo/` | `seo` · `Web-SEO` · `web seo` · `web_seo` |
| `description` | 20 a 512 caracteres, com `Use` + `quando`/`ao`/`para`/`em`/`when`/`if`/`case`, `Dispare para` ou `Gatilhos` | `Use ao lidar com title e canonical.` | `Otimiza páginas.` · `Use isto.` · acima de 1024 — some da sessão |
| `version` | `X.Y.Z` em coluna zero — fora dela o instalador (`bin/index.js:334`) não lê | `1.0.0` | `1.0` · `v1.0.0` · `latest` · aninhada em `metadata:` |
| `license` | literal `Unlicense`; import com `LICENSE.txt` próprio usa o SPDX dele (`skill-creator` → `Apache-2.0`) | `Unlicense` | `MIT` · `Apache-2.0` sem `LICENSE.txt` na pasta · ausente |
| `model` | opcional: `haiku` (sem tanta exigência cognitiva), `sonnet` (intermediário), `opus` (qualquer ação que precise pensar); | `opus` | |
| outro | proibido | — | `tags` · `metadata:` · `author` · `allowed-tools` |

## Versão

- Mudou → suba `version`.
- Nunca reduza.

## Validar

`node skills/skill-builder/scripts/validate.js` → `0 invalid`.

