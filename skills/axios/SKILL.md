---
name: axios
description: Use ao trabalhar com axios e requisição HTTP.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Axios

- [axios](https://axios.rest)
- [axios - segurança](https://axios.rest/pages/misc/security.html)

**Sempre na última versão.**

## Documentação

- Documentação: Context7 `/axios`.
- Sem MCP próprio.

## Segurança

- **Verificado em `axios@1.21.1`.**
- Mínimo `1.20.0`: abaixo, `npm audit` acusa SSRF via `NO_PROXY`, prototype pollution e DoS.
- Nunca `1.14.1` nem `0.30.4` (supply chain, 31/03/2026). `plain-crypto-js` no lockfile → máquina comprometida.
