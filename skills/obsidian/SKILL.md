---
name: obsidian
description: Cria, edita e revisa notas Markdown de um vault Obsidian de estudo pessoal. Acionado quando o usuário editar arquivos Markdown, revisar Obsidian, análise de Vault, e tudo que for estudo pessoal. Use quando o usuário mencionar Obsidian ou Vault ou pedir explicitamente qualquer coisa relacionada.
allowed-tools: Read Edit Write Glob Grep Bash
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Obsidian — Vault de Estudo

Este vault é um repositório de estudo pessoal. Priorize estrutura, hierarquia, tags e conexões entre notas.

A skill deve produzir notas conectadas por wikilinks, classificadas por tags hierárquicas e organizadas em blocos separados por `---`.

**IMPORTANTE**: cada bloco de conhecimento deve conter uma única ideia e terminar com tags inline relevantes; os blocos de conhecimento devem ser separados por `---`.

---

## Fluxo obrigatório

1. Liste as notas existentes (`Glob **/*.md`) antes de criar links ou notas.
2. Levante as tags já usadas (`Grep` em `tags:` e `#`) e reutilize-as.
3. Nota com o mesmo tema já existe: edite-a. Não crie duplicata.
4. Ao editar, altere só o pedido. Preserve TUDO já existente.
5. Valide com o checklist final antes de salvar.

---

## Regras obrigatórias

- Dados: nunca invente autor, ano, URL ou nível, ou qualquer informação, sem certeza: omita o campo
- Links internos: use sempre `[[Wikilink]]`; nunca `[texto](arquivo.md)` para notas internas.
- Frontmatter: use YAML válido com chaves reais; remova campos vazios.
- Campos proibidos: `date`, `created`, `updated`, `modified`, `aliases`, `cssclasses`, `folder`
- Tags: use no frontmatter para classificar a nota e inline no corpo para classificar blocos.
- Hierarquia de tags: nunca use múltiplos níveis, como `#area/subtema`; use apenas `#tag`.
- Separadores: use `---` no corpo para dividir unidades autônomas de conhecimento.
- Blocos: cada bloco relevante separado por `---` deve terminar com pelo menos uma tag inline temática.
- Wikilinks: toda nota pode ter links para outras notas relacionadas.
- Callouts: nunca use headings `##` dentro do corpo do callout.

---

## Frontmatter

| Campo | Valores | Quando usar |
|---|---|---|
| `title` | Nome da nota | Sempre |
| `type` | `book` `article` `reference` `note` `tool` `course` | Sempre |
| `domain` | `programming` `devops` `self-development` `business` `finance` `health` `philosophy` `theology` `social` `science` `marketing` `sales` | Sempre |
| `topic` | kebab-case | Sempre |
| `status` | `draft` `in-progress` `completed` `archived` | Sempre |
| `tags` | Lista YAML | Sempre |
| `author` `year` | — | `book`, `article`, `course` |
| `url` | — | Fonte online |
| `level` | `beginner` `intermediate` `advanced` `expert` | `reference`, `course`, `tool` |

---

## Tags

- Frontmatter: classifica a nota inteira.
- Inline: classifica o bloco; fica no fim do bloco, antes do `---`.
- Use par área + subtema como tags separadas: `#technology #architecture`.
- Evite genéricas: `#nota`, `#ideia`, `#conceito`.
- Não crie sinônimo de tag existente.

---

## Wikilinks e embeds

```markdown
[[Nota]]  [[Nota|Alias]]  [[Nota#Heading]]  [[Nota#^block-id]]
![[Nota#^block-id]]  ![[imagem.png|300]]
```

- Conecte cada nota a pelo menos uma nota relacionada, se houver relação real. Nunca crie link artificial.
- Conexão parte do raciocínio: link inline. Conexão complementar: linha final `Veja também:`.
- Block ID (`^id` no fim da linha, kebab-case) só em bloco que será citado ou embedado.
- Prefira embed de bloco a embed de nota inteira.

---

## Callouts

| Tipo | Uso |
|---|---|
| `[!note]` | Observação |
| `[!warning]` | Risco ou limitação |
| `[!tip]` | Recomendação prática |
| `[!quote]` | Citação |
| `[!summary]` | Resumo |

Use só com função semântica clara.

---

## Exemplo canônico

```markdown
---
title: Event-Driven Architecture
type: reference
domain: programming
topic: event-driven-architecture
status: in-progress
level: intermediate
tags:
  - technology
  - architecture
  - events
---

Event-Driven Architecture é um modelo em que componentes se comunicam por eventos, reduzindo acoplamento entre produtores e consumidores. ^event-driven-definition

#technology #architecture

---

Eventos representam fatos que já aconteceram no sistema e devem ser tratados como registros imutáveis.

#technology #events

---

Veja também: [[Event Streaming]] | [[Message Queue]] | [[Distributed Systems]]
```

---

## Checklist final

- [ ] Frontmatter YAML válido, sem campo vazio, proibido ou inventado
- [ ] Tags de um nível, reutilizadas do vault, sem sinônimo
- [ ] Um bloco por ideia, cada um com tag inline
- [ ] Todo link interno em `[[Wikilink]]`, apontando para relação real
- [ ] Nenhuma nota duplicada criada
