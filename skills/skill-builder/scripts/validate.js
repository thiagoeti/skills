#!/usr/bin/env node
// Valida o frontmatter de skills/*/SKILL.md pelo contrato da skill-builder (seção Frontmatter). Falhou → exit 1.
import fs from 'fs';
import path from 'path';

const TRIGGER = /\bUse\b.*?\b(quando|ao|para|em|when|if|case)\b|\bDispare para\b|\bGatilhos\b/i;
const SPDX = { 'Apache-2.0': /Apache License\s+Version 2\.0/, MIT: /MIT License/ };

// Cada regra devolve o erro, ou nada se passou.
const RULES = {
  name: (v, dir) =>
    (v !== dir || !/^[a-z0-9-]{1,64}$/.test(v) || /claude|anthropic/.test(v)) &&
    `name: igual à pasta "${dir}", [a-z0-9-], até 64, sem claude/anthropic`,
  description: (v) =>
    (!TRIGGER.test(v) || v.length < 20 || v.length > 512) &&
    `description: 20 a 512 caracteres (tem ${v.length}), com "Use" + quando/ao/para/em, "Dispare para" ou "Gatilhos"`,
  version: (v) => !/^\d+\.\d+\.\d+$/.test(v) && 'version: X.Y.Z em coluna zero',
  license: (v, dir, skillPath) => {
    if (v === 'Unlicense') return;
    const own = path.join(skillPath, 'LICENSE.txt');
    const ok = fs.existsSync(own) && SPDX[v]?.test(fs.readFileSync(own, 'utf-8'));
    return !ok && 'license: Unlicense, ou o SPDX do LICENSE.txt da pasta';
  },
  model: (v) => !/^(haiku|sonnet|opus)$/.test(v) && 'model: haiku, sonnet ou opus',
};
const OPTIONAL = new Set(['model']);

// Lê só chave de coluna zero; description em bloco (> |) vira uma linha.
function parse(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const lines = m[1].split('\n');
  const fields = {};
  const errors = [];
  lines.forEach((line, i) => {
    if (/^\s|^#/.test(line) || !line.includes(':')) return;
    const key = line.slice(0, line.indexOf(':')).trim();
    let value = line.slice(line.indexOf(':') + 1).trim();
    if (!(key in RULES)) errors.push(`campo fora do contrato: ${key}`);
    if (value && !/^["'|>]/.test(value) && /: | #/.test(value)) errors.push(`${key}: ": " ou " #" sem aspas — use bloco > ou aspas`);
    if (/^[|>][-+]?$/.test(value)) {
      const block = [];
      for (let j = i + 1; j < lines.length && (lines[j] === '' || lines[j].startsWith(' ')); j++) block.push(lines[j].trim());
      value = block.filter(Boolean).join(' ');
    }
    fields[key] = value.replace(/^["']|["']$/g, '');
  });
  return { fields, errors };
}

function validate(skillPath, dir) {
  const file = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(file)) return ['SKILL.md ausente'];
  const parsed = parse(fs.readFileSync(file, 'utf-8'));
  if (!parsed) return ['sem frontmatter: --- na linha 1'];
  const { fields, errors } = parsed;
  for (const [key, rule] of Object.entries(RULES)) {
    const error = fields[key] ? rule(fields[key], dir, skillPath) : !OPTIONAL.has(key) && `${key}: ausente`;
    if (error) errors.push(error);
  }
  return errors;
}

let root = process.cwd();
while (!fs.existsSync(path.join(root, 'package.json')) && path.dirname(root) !== root) root = path.dirname(root);
const skillsDir = path.join(root, 'skills');
if (!fs.existsSync(skillsDir)) {
  console.error(`skills/ não encontrado em ${root}`);
  process.exit(1);
}

const dirs = fs.readdirSync(skillsDir).filter((d) => !d.startsWith('.') && fs.statSync(path.join(skillsDir, d)).isDirectory());
let invalid = 0;
for (const dir of dirs) {
  const errors = validate(path.join(skillsDir, dir), dir);
  if (!errors.length) continue;
  invalid++;
  console.log(`✗ ${dir}\n${errors.map((e) => `  → ${e}`).join('\n')}`);
}
console.log(`${dirs.length - invalid} valid, ${invalid} invalid`);
if (invalid) {
  console.log('Contrato: skills/skill-builder/SKILL.md → Frontmatter');
  process.exit(1);
}

