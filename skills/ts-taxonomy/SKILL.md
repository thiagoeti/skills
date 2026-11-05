---
name: ts-taxonomy
description: Use ao criar, editar ou revisar qualquer código TypeScript; use sempre — todo nome novo ou alterado (classe, interface, método, função, variável, arquivo, pasta, env, config, tabela, rota, comando, fila, métrica), mesmo sem pedido direto. Taxonomia e convenção de nomenclatura, prefixo ou sufixo são importantes. Nomeia pelo assunto primeiro e decide o caso pela camada.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# TS Taxonomy

Estilo segue o [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html). Abaixo, só o que ele não cobre.

## Base de Referência Técnica

- papel → assunto
- assunto → objeto → ação
- assunto → coisa → variante
- papel → assunto → variante — classe, instância e tipo com papel (controller, service, repository, gateway, schema, erro, evento, command, query, use case, job, worker, task, saga, consumer, producer, publisher, subscriber, queue, bus, listener, handler, middleware, guard, interceptor, filter, factory, builder, mapper, validator, adapter, client, provider, module, plugin, store, pool, context, entity, strategy, observer, decorator, state, specification, mediator, processor, scheduler, manager, notifier, sender, reader, writer, formatter, logger)
- método: objeto → ação, sem o assunto da classe (`balanceGet`, `idFind`)

**Prefixo + Algo - esta é a base de tudo, vai do geral ao mais específico, e o prefixo deve ser pelo assunto e consistente em todo o sistema.**

Sufixo só quando existe obrigatoriedade por uma ferramenta: `.test.ts`.

Todo identificador em inglês: classe, função, método, variável, tipo, arquivo, pasta, env, tabela, coluna, chave. Texto para gente — mensagem, rótulo, título de teste — segue a língua do produto.

## Exemplos

| Artefato | ✅ | ❌ |
|---|---|---|
| Função | `pixSettle`, `pixRefund` | `settlePix`, `refundPix` |
| Tipo e entidade (`type` ou `class`) | `PixTransfer`, `PixTransferStatus` | `TransferStatusPix`, `Status` |
| Classe por papel | `ControllerPix`, `ServicePix`, `RepositoryPix` | `PixController`, `PixService`, `PixRepository`, `Service` |
| Interface e implementação | `InterfacePixGateway` → `GatewayPixHttp`, `GatewayPixFake`; `InterfacePixRepository` → `RepositoryPixPostgres`, `RepositoryPixMemory`; `InterfacePixConfig` | `PixGateway`, `IPixGateway`, `PixGatewayInterface`, `PixGatewayImpl`, `PixGatewayHttp`, `PostgresPixRepository` |
| Classe abstrata | `AbstractPixGateway`, `AbstractPixRepository` | `PixGatewayBase`, `BasePixGateway`, `PixGatewayAbstract` |
| Instância com papel (valor) | `controllerPix = new Elysia({ prefix: '/pix' })`, `servicePix`, `middlewarePixAuth` | `pixController`, `pixRoutes`, `authMiddleware` |
| Job, worker, listener, handler | `JobPixSettle`, `WorkerPixSettle`, `ListenerPixAudit`, `HandlerPixWebhook` | `PixJobSettle`, `SettlePixJob`, `AuditListener`, `PixWebhookHandler` |
| Factory, mapper, validator, adapter, client | `FactoryPixTransfer`, `MapperPixTransfer`, `ValidatorPixKey`, `AdapterPixBacen`, `ClientPixHttp` | `PixTransferFactory`, `TransferMapper`, `PixKeyValidator`, `BacenAdapter`, `HttpClient` |
| Schema, input e output | `schemaPixTransfer` (valor), `InputPixSettle`, `OutputPixSettle` (tipo) | `pixTransferSchema`, `PixSettleInput`, `SettlePixRequest`, `CreateTransferDto` |
| Família de erro | `ErrorPix` → `ErrorPixTimeout`, `ErrorPixDeclined` | `PixErrorTimeout`, `TimeoutPixError`, `PixTimeoutError` |
| Evento | `EventPixTransferSettled` | `PixTransferSettled`, `SettledPixTransfer`, `PixTransferSettledEvent` |
| Booleano de módulo | `pixIsEnabled` | `isPixEnabled` |
| Constante | `PIX_SETTLE_TIMEOUT_MS` | `TIMEOUT_MS`, `SETTLE_TIMEOUT_PIX` |
| Arquivo e pasta | `src/pix/controller_pix.ts`, `src/pix/repository_pix_postgres.ts` | `src/controllers/controller_pix.ts`, `src/pix/pix_controller.ts` |
| Teste | `src/pix/service_pix.test.ts` | `test/services/service.test.ts`, `src/pix/pix_service.test.ts` |

## Sem o assunto do módulo

Ordem geral → específico continua; só o assunto sai.

| Nome | Exemplo |
|---|---|
| Variável local e parâmetro | `dateStart`, `amountFee`; nunca `startDate`, `feeAmount`, `pixDateStart` |
| Chave de objeto, membro de classe e de interface | `transfer.amountCents`, nunca `transfer.pixAmountCents` |
| Método | objeto → ação: `account.balanceGet()`, `repositoryUser.idFind(id)`, `transfer.statusUpdate()`; nunca `getBalance`, `findById`, `updateStatus`. Método de uma palavra fica (`settle`, `build`); booleano sem objeto fica `isSettled()` |
| Membro de `enum` | `PixOutcome.SETTLED` |
| Nome exigido por API externa, framework ou padrão canônico | `onRequest`, `beforeAll`, `fetch`, `toJSON`; GoF: `execute`, `undo`, `accept`, `visit`, `notify`, `update`, `subscribe`, `setNext` |
| Idioma canônico | builder fluente `withAmount()`; `getInstance()` do Singleton; conversão `toDomain()`, `toPersistence()`, `toBase64()`, `fromRow()`; query builder `where()`, `orderBy()`; registro de callback `onReply()`; tool MCP em `verbo_substantivo` (`create_task`) |

## Exceção: import de biblioteca

Nome importado fica como a doc oficial escreve: sem prefixo, sem alias.

| ✅ | ❌ |
|---|---|
| `import { Elysia, t } from 'elysia'` | `import { t as ElysiaT } from 'elysia'` |
| `import { z } from 'zod'` | `import { z as Zod } from 'zod'` |
| `import { SQL } from 'bun'` | `import { SQL as BunSql } from 'bun'` |

Alias `as` só quando:

| Caso | Exemplo |
|---|---|
| Dois imports colidem no arquivo | `import { Worker as BullWorker } from 'bullmq'` ao lado do `Worker` global |
| A doc usa alias | `import { test as setup } from '@playwright/test'` |

## Fora do código TS

Env, container, rede, volume, métrica e stream são namespace global: sem prefixo é erro, não estilo.

| Artefato | Caso | ✅ | ❌ |
|---|---|---|---|
| Variável de ambiente | `SCREAMING_SNAKE` | `PIX_GATEWAY_URL` | `URL`, `TIMEOUT` |
| Container, rede, volume, imagem | `kebab-case` | `pix-publisher` | `publisher` |
| Métrica, stream, tabela, coluna | `snake_case` | `pix_settle_duration_seconds` | `settle_duration_seconds` |
| Operação de span, evento, routing key | `dot.case` | `pix.settle`, `pix.transfer.settled` | `settle`, `pix.settle.${id}` — o id vai em atributo |

## Comentários

- Todo arquivo abre com uma linha dizendo o que ele é.
- Uma linha, em inglês, sobre o porquê; duas só se uma não fecha.
- Comente decisão contraintuitiva, armadilha, trade-off, ordem que importa, limite conhecido.
- Não comente o que repete o código ou o nome; nada de JSDoc sem informação (`@param transfer the transfer`).

## Lint

- Use o TypeScript mais recente.
- Antes do lint, rode `npm view typescript-eslint peerDependencies.typescript`.
- Se não aceitar a versão do projeto → pacote `typescript` na última versão aceita, para o lint; a mais recente por alias (`"typescript-latest": "npm:typescript@latest"`) para o typecheck — receita na `ts-typecheck`.

```typescript
// eslint.config.ts
import { defineConfig } from 'eslint/config';
import TSeslint from 'typescript-eslint';

export default defineConfig({
  files: ['**/*.ts'],
  languageOptions: { parser: TSeslint.parser },
  plugins: { '@typescript-eslint': TSeslint.plugin },
  rules: {
    '@typescript-eslint/naming-convention': ['error',
      { selector: 'default', format: ['camelCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' },
      { selector: 'import', format: ['camelCase', 'PascalCase'] },
      { selector: 'variable', modifiers: ['const', 'global'], format: ['camelCase', 'UPPER_CASE'] },
      { selector: 'classProperty', modifiers: ['static', 'readonly'], format: ['camelCase', 'UPPER_CASE'] },
      { selector: ['objectLiteralProperty', 'typeProperty'], format: ['camelCase', 'UPPER_CASE'] },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'class', format: ['PascalCase'], custom: { regex: '(Controller|Service|Repository|Gateway|Schema|Error|Event|Command|Query|UseCase|Job|Worker|Task|Saga|Consumer|Producer|Publisher|Subscriber|Queue|Bus|Listener|Handler|Middleware|Guard|Interceptor|Filter|Factory|Builder|Mapper|Validator|Adapter|Client|Provider|Module|Plugin|Store|Pool|Context|Entity|Strategy|Observer|Decorator|State|Specification|Mediator|Processor|Scheduler|Manager|Notifier|Sender|Reader|Writer|Formatter|Logger|Impl|Base|Abstract|Interface)$|^Base[A-Z]', match: false } },
      { selector: 'class', modifiers: ['abstract'], format: ['PascalCase'], custom: { regex: '^Abstract[A-Z]', match: true } },
      { selector: 'interface', format: ['PascalCase'], custom: { regex: '^Interface[A-Z]', match: true } },
      { selector: 'enumMember', format: ['UPPER_CASE'] },
      { selector: ['objectLiteralProperty', 'typeProperty'], modifiers: ['requiresQuotes'], format: null },
    ],
  },
});
```

| Lint pega | Revise à mão |
|---|---|
| Caso | Ordem das palavras: `settlePix`, `startDate`, `PixController` |
| Papel no fim da classe: `PixService` | Identificador em português: `pedidoCriar` |
| Interface sem `Interface` na frente: `PixGateway`, `IPixGateway` | Alias de import desnecessário: `import Pg from 'pg'` |
| Abstrata sem `Abstract` na frente: `PixGatewayBase` | — |
