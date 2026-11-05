---
name: aif
description: Set up agent context for a project. Analyzes tech stack, installs relevant skills from skills.sh, generates custom skills, and configures MCP servers. Use when starting new project, setting up AI context, or asking "set up project", "configure AI", "what skills do I need".
argument-hint: "[project description]"
allowed-tools: Read Glob Grep Write Bash(mkdir *) Bash(node *update-config.mjs*) Bash(npx skills *) Bash(python3 --version) Bash(python --version) Bash(py -3 --version) Bash(py --version) Bash(python3 *security-scan.py*) Bash(python *security-scan.py*) Bash(py -3 *security-scan.py*) Bash(py *security-scan.py*) Bash(python3 *cleanup-blocked-skill.py*) Bash(python *cleanup-blocked-skill.py*) Bash(py -3 *cleanup-blocked-skill.py*) Bash(py *cleanup-blocked-skill.py*) Skill WebFetch AskUserQuestion Questions
---

# AI Factory - Project Setup

## Shared project skill-context

Before mode routing or work, read existing files relative to the current project root in this order (reuse them if already loaded):

1. `.ai-factory/skill-context/global-skill-context.md` — all bundled skills.
2. `.ai-factory/skill-context/aif/SKILL.md` — this skill.

Missing files are skipped; an existing unreadable file stops dependent work with its path.
Precedence: individual > build (when applicable) > global > skill defaults; retain non-conflicting instructions and check all outputs against the effective rules.
These layers customize workflow; they do not replace the project's rules/architecture hierarchy or relax explicit requirements, ownership, scope, safety/privacy, validation, or approval boundaries. Report conflicts with those boundaries instead of overriding them.
`global` is a project-local layer, not home-directory configuration. Custom/extension skills do not automatically use it.

Set up agent for your project by:
1. Analyzing the tech stack
2. Installing skills from [skills.sh](https://skills.sh)
3. Generating custom skills via `/aif-skill-generator`
4. Configuring MCP servers for external integrations

## Selective reference loading

Resolve reference paths beside this installed entrypoint, including flat workflows. Read a reference in full only when its stated condition applies, before the dependent step; do not preload all references. If a selected reference is missing or unreadable, STOP before that step and report its path. The entrypoint dispatch and hard boundaries apply to every reference. Project skill-context overrides and managed extension injections retain their existing precedence. Keep managed `aif-ext` blocks in the entrypoint; never move them into references.

## External skill safety

Before installing any external skill or generating a Learn Mode skill, read [security scanning](references/SETUP-SECURITY.md). Require supported Python 3 and both readable scanner/cleanup helpers before acquisition; missing prerequisites STOP acquisition. Never trust or use an external skill before the automated and semantic checks permit it. Scan only the actual installed external path; never block built-in `aif*` skills. A blocked skill requires cleanup exit 0 and verified removal of its scanned directory and known lock identities; otherwise report incomplete cleanup and STOP.

### Project Context

**Read `.ai-factory/skill-context/aif/SKILL.md`** — MANDATORY if the file exists.

This file contains project-specific rules accumulated by `/aif-evolve` from patches,
codebase conventions, and tech-stack analysis. These rules are tailored to the current project.

**How to apply skill-context rules:**
- Treat them as **project-level overrides** for this skill's general instructions
- When a skill-context rule conflicts with a general rule written in this SKILL.md,
  **the skill-context rule wins** (more specific context takes priority — same principle as nested CLAUDE.md files)
- When there is no conflict, apply both: general rules from SKILL.md + project rules from skill-context
- Do NOT ignore skill-context rules even if they seem to contradict this skill's defaults —
  they exist because the project's experience proved the default insufficient
- **CRITICAL:** skill-context rules apply to ALL outputs of this skill — including DESCRIPTION.md,
  AGENTS.md, and MCP configuration. The templates in this SKILL.md are **base structures**. If a
  skill-context rule says "DESCRIPTION.md MUST include X" or "AGENTS.md MUST have section Y" —
  you MUST augment the templates accordingly. Generating artifacts that violate skill-context rules
  is a bug.

**Enforcement:** After generating any output artifact, verify it against all skill-context rules.
If any rule is violated — fix the output before presenting it to the user.

## Skill Acquisition Strategy

**Always search skills.sh before generating. Always scan before trusting.**

```
For each recommended skill:
  1. Search: npx skills search <name>
  2. If found → Install: npx skills install --agent claude-code <name>
  3. SECURITY: Scan installed EXTERNAL skill (never built-in aif*) → run the selected concrete Python command with `security-scan.py <path>`
     - BLOCKED? → run the selected concrete Python command with `cleanup-blocked-skill.py --skill <name> --installed-path <path>` (reuse the same <path> from step 3, NOT a synthesized .claude/skills/<name>), warn user, skip this skill
     - WARNINGS? → show to user, ask confirmation
  4. If not found → Generate: /aif-skill-generator <name>
  5. Has reference URLs? → Learn: /aif-skill-generator <url1> [url2]...
```

**Learn Mode:** When you have documentation URLs, API references, or guides relevant to the project — pass them directly to skill-generator. It will study the sources and generate a skill based on real documentation instead of generic patterns. Always prefer Learn Mode when reference material is available.

---

## Workflow

**First, determine which mode to use:**

```
Check $ARGUMENTS:
├── Has description? → Mode 2: New Project with Description
└── No arguments?
    └── Check project files (package.json, composer.json, etc.)
        ├── Files exist? → Mode 1: Analyze Existing Project
        └── Empty project? → Mode 3: Interactive New Project
```

---

## Language Resolution

Immediately after determining Mode 1, Mode 2, or Mode 3, resolve the project language settings for the entire `/aif` run.

**Run-scoped language state:**
- `language.ui` — use for all `AskUserQuestion` prompts, intermediate explanations, final summary, and next-step recommendations
- `language.artifacts` — use for all setup-time text artifacts created in this run: `.ai-factory/DESCRIPTION.md`, `.ai-factory/rules/base.md`, `AGENTS.md`, and `.ai-factory/ARCHITECTURE.md` via `/aif-architecture`
- `language.technical_terms` — preserve the existing value if it is already set; default to `keep` only when the key is missing

**Resolution order for each missing key:**
1. `.ai-factory/config.yaml`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `RULES.md`
5. Ask the user

**Resolution workflow:**
1. Read `.ai-factory/config.yaml` if it exists and preserve any already-set `language.ui` / `language.artifacts` values.
2. If both keys are already set, reuse them and do not ask again.
3. If only one key is missing, resolve only that missing key via the priority order above. Ask the user only for the missing value if repository context is still insufficient.
4. If both keys are missing and repository context is insufficient, the first user question after mode detection MUST be about `UI language`, and the second language question MUST be about `Artifact language`.
5. Preserve `language.technical_terms` from existing config when present; otherwise set it to `keep` when writing config.
6. Keep the resolved language state fixed for the entire `/aif` run. Do not generate setup-time text artifacts in a different language later in the same run.

All user-facing text examples below are structure examples only. Ask them in resolved `language.ui`, never hard-code English when another UI language was resolved.

Before the first language question, config write, or generated artifact, read [setup configuration and base-rule templates](references/SETUP-CONFIG.md). Use the canonical `update-config.mjs` helper for create/merge; preserve comments, manual values, command defaults, `rules.<area>`, and user-owned `warmup.paths`. An unsafe structure or invalid payload stops setup; never fall back to free-form YAML. Persist resolved settings before any setup artifact or `/aif-architecture`.

## Existing project route

For Mode 1 only, read [existing-project setup](references/SETUP-EXISTING.md), analyze the real stack, persist config before artifacts, and confirm the installation/generation plan before executing it.

## Described project route

For Mode 2 only, read [new-project setup](references/SETUP-NEW.md). Resolve language and persist config before stack questions or artifacts; ask for relevant stack choices and obtain confirmation.

## Empty project route

For Mode 3 only, read [empty-project setup](references/SETUP-EMPTY.md). Resolve language and persist config before asking what to build, then read the new-project reference and follow its Steps 3–6 for stack selection and specification generation; do not repeat the completed language/config steps.

## MCP setup route

Only when configuring selected MCP servers, read [runtime formats and server templates](references/SETUP-MCP.md). Write the correct wrapper to `.mcp.json` and remind the user about required credential environment variables.

## Project map route

Before generating setup-time `AGENTS.md`, read [project-map generation](references/SETUP-AGENTS.md). Describe the actual project structure in `language.artifacts`; apply project skill-context requirements to the template.

## Rules

1. **Search before generating** — Don't reinvent existing skills
2. **Ask confirmation** — Before installing or generating
3. **Check duplicates** — Don't install what's already there
4. **MCP in `.mcp.json`** — Project-level MCP configuration
5. **Remind about env vars** — For MCP that need credentials

## Artifact Ownership

- Primary ownership in this command: `.ai-factory/DESCRIPTION.md`, setup-time `AGENTS.md`, installed skills, and MCP configuration.
- Delegated ownership: invoke `/aif-architecture` to create/update `.ai-factory/ARCHITECTURE.md`.
- Read-only context in this command by default: the resolved roadmap, RULES.md, research, and plan artifacts.

## CRITICAL: Do NOT Implement

**This skill ONLY sets up context (skills + MCP). It does NOT implement the project.**

After setup artifacts are configured, read [completion and architecture handoff](references/SETUP-COMPLETION.md), invoke `/aif-architecture` only after config exists, and present next steps in `language.ui`. Stop after the selected setup follow-ups. Do not write application code, implement features, or create application structure.
