---
name: skill-command
description: Use ao criar, revisar ou renomear comando de barra; transformar skill em comando, montar família de comandos com prefixo (/opsx, /vsa). Cria, revisa e organiza comandos em .claude/commands e a divisão entre comando e skill.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Skill command

**Modelo de sugestão, tabela de comando:**

| | Ação |
|---|---|
| Comando | intenção — o que fazer agora |
| Skill | conhecimento — como se faz |

Regra que serve a mais de um comando mora na skill; o comando só a nomeia.

## Skill ou comando

| O usuário… | Vira |
|---|---|
| Descreve problema, sem citar o passo | Skill |
| Quer regra em qualquer tarefa do domínio | Skill |
| Digita verbo com alvo ("cria a fatia X") | Comando utiliza skill |
| Quer o mesmo fluxo, sempre na mesma ordem | Comando chama skill |

**NUNCA use comando sem skill.**

## Criar

1. **Nomeie** — `.claude/commands/<familia>/<verbo>.md` → `/familia:verbo`; fora desse caminho o comando não aparece. Verbo curto: `init`, `slice`, `check`, `review`, `map`, `split`. Renomear o arquivo renomeia o comando.
2. **Entrada** — sem argumento, não escreva `$ARGUMENTS`.
3. **Corpo** — imperativo, começando pela ação. Comando que não altera nada diz: "Não altere nada."
4. **Skill** — toda etapa não trivial nomeia a skill que a decide. Não existe → crie antes, pelo `skill-builder`.
5. **Saída** — feche com checklist, tabela ou relatório.
6. **Registre** — tabela *Comandos* da skill índice da família e `CLAUDE.md` da raiz.

## Regras Importantes

- **Nunca use comando sem skill.**
- Arquivo fora de `.claude/commands/` → o comando não aparece.
- Renomear o arquivo renomeia o comando.
- Argumento ausente → mande inferir do contexto ou perguntar. Nunca invente o valor.

## Skill ou comando

| O usuário… | Vira |
|---|---|
| Descreve problema, sem citar o passo | Skill |
| Quer regra em qualquer tarefa do domínio | Skill |
| Digita verbo com alvo ("cria a fatia X") | Comando utiliza skill |
| Quer o mesmo fluxo, sempre na mesma ordem | Comando chama skill |

## Frontmatter

`.claude/commands/git/review.md` → `/git:review src/pagamento.ts`

```markdown
---
description: Revisa o diff atual e aponta bug, teste faltando e nome fora da taxonomia
argument-hint: "[arquivo]"
allowed-tools: Bash(git diff:*)
---

Revise este diff. Com argumento, só o arquivo `$ARGUMENTS`. Não altere nada.

!`git diff HEAD`
```

| Chave | Efeito | Use quando |
|---|---|---|
| `description` | aparece na lista; ausente → vira a 1ª linha do corpo | sempre |
| `allowed-tools` | pré-aprova ferramenta, ex. `Bash(openspec:*)` | roda binário ou `!` |
| `argument-hint` | dica de argumento na UI | recebe argumento |

`description`: uma linha, sem ponto final, verbo na 3ª pessoa ("Cria…", "Revisa…").

## Argumentos

| Forma | Recebe |
|---|---|
| `$ARGUMENTS` | tudo depois do comando |
| `$1` … `$9` | posicional |

**Argumento ausente: mande inferir do contexto ou perguntar. Nunca invente o valor.**

## Contexto dinâmico

- `` !`comando` `` roda antes do agente ler o prompt e injeta a saída.
- Exige `allowed-tools`.
- Use só para estado real (`git diff`, `openspec list --json`) — injeção custa contexto a cada invocação.

## Família

Mais de dois comandos com o mesmo prefixo:

1. Prefixo curto, igual ao da família de skills (`vsa`, `opsx`).
2. Skill índice com o nome do prefixo: tabela *Comando → Faz*.
3. Referência entre irmãs só no índice — exceto no comando, que nomeia a skill que invoca.
4. Ordem obrigatória declarada no índice (`explore → propose → apply → archive`).

