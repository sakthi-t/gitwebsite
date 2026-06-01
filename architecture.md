# Haney Architecture

## Overview

Haney is a terminal-based AI coding assistant built with Python, Typer, Rich, and LiteLLM. It follows a modular, layered architecture where each subsystem is isolated and communicates through well-defined interfaces.

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Terminal                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  ui/composer.py                                         │  │
│  │  Sticky input area, status bar, styled prompts          │  │
│  └───────────────────────┬────────────────────────────────┘  │
│                          │                                    │
│  ┌───────────────────────▼────────────────────────────────┐  │
│  │  chat.py                                                │  │
│  │  Read-eval loop, session lifecycle, context init        │  │
│  └───────┬───────────────────────────────────┬────────────┘  │
│          │                                   │                │
│  ┌───────▼──────────┐              ┌─────────▼───────────┐   │
│  │  commands.py      │              │  llm.py              │   │
│  │  27 slash-cmds    │              │  ChatSession         │   │
│  │  dispatch router  │              │  Streaming + tools   │   │
│  └───────────────────┘              └─────────┬───────────┘   │
│                                               │               │
│  ┌────────────────────────────────────────────┼───────────┐   │
│  │  Context Layer                             │           │   │
│  │  ┌──────────────┐  ┌──────────────┐       │           │   │
│  │  │ project_ctx   │  │ file_ctx     │       │           │   │
│  │  │ plan.md etc   │  │ @file attach │       │           │   │
│  │  └──────────────┘  └──────────────┘       │           │   │
│  └────────────────────────────────────────────┼───────────┘   │
│                                               │               │
│  ┌────────────────────────────────────────────▼───────────┐   │
│  │  LiteLLM (external)                                     │   │
│  │  Provider routing, tool calling, streaming              │   │
│  └────────┬──────────┬──────────┬──────────┬──────────────┘   │
│           │          │          │          │                   │
│      OpenAI    DeepSeek   Anthropic   Gemini   ...             │
└──────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
haneycli/
├── app.py                        # Entry point
├── requirements.txt
├── README.md
├── docs/                         # Documentation
├── haney/
│   ├── cli.py                    # Typer CLI application
│   ├── chat.py                   # Read-eval loop, composer init
│   ├── commands.py               # 27 slash-command handlers + dispatch
│   ├── llm.py                    # ChatSession, streaming, tool integration
│   ├── config.py                 # Constants (HANEY_DIR, VERSION, etc.)
│   ├── config_bootstrap.py       # Master config schema, auto-population
│   ├── providers.py              # Provider registry, live model fetching
│   ├── project_context.py        # File discovery, context preamble injection
│   ├── file_context.py           # @file attachment parsing, loading, token est.
│   ├── session_manager.py        # Session lifecycle, JSON persistence, cost
│   ├── search.py                 # Exa search integration
│   ├── thinking_manager.py       # Unified thinking mode abstraction
│   ├── mode_manager.py           # PLAN/EDIT mode guard
│   ├── permission_manager.py     # ASK/SAVE/AUTO approval modes
│   ├── setup.py                  # First-run wizard, file templates
│   ├── banner.py                 # Cat ASCII art
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── file_tools.py         # Read, write, edit, rename, trash, restore
│   │   ├── shell_tools.py        # Safe command whitelist/blacklist execution
│   │   └── tool_manager.py       # Tool registry, LiteLLM tool-calling, approval
│   └── ui/
│       ├── __init__.py
│       └── composer.py           # Sticky input composer, status bar
└── .haney/                       # Runtime directory (created at first run)
    ├── config.json               # All configuration
    ├── system.md                 # System prompt
    ├── memory.md                 # Long-term project memory
    ├── summary.md                # Compressed conversation summary
    ├── tasks.md                  # Task tracking
    ├── help.md                   # Command reference
    ├── sessions/                 # Archived session JSON files
    └── trash/                    # Safe-deleted files
```

## Core Subsystems

### 1. Chat Loop (`chat.py`)

The entry point after CLI boot. Responsibilities:
- Bootstrap configuration (auto-populate missing keys)
- Initialize `SessionManager`, `ProjectContextManager`, `PermissionManager`
- Create `ChatSession` and `Composer`
- Run the read-eval loop
- Save session on exit

### 2. ChatSession (`llm.py`)

The central class managing every LLM interaction. Flow per user message:
1. Parse `@file` attachments, strip from message
2. Search Exa (if enabled)
3. Build messages: system prompt + project context + attachment context + history
4. Stream LLM response via LiteLLM
5. If tool calls returned: execute via ToolManager, feed results back, re-call
6. Record usage (tokens, cost) in SessionManager
7. Display response

### 3. Context Injection Pipeline

Three sources of context are merged into every LLM request:

| Layer | Source | Managed by |
|---|---|---|
| System prompt | `.haney/system.md` | `ChatSession._load_system_prompt()` |
| Project context | `plan.md`, `memory.md`, `summary.md`, `README.md` | `ProjectContextManager.build_context_preamble()` |
| Attachment context | `@file` references | `FileContextManager.build_context()` |

The final system message is:
```
[system prompt + current mode]
[project context preamble]
[attachment context]
[web search results (if any)]
```

### 4. Tool Execution Pipeline

```
Model returns tool_call
  → ToolManager.execute_tool_call()
    → Mode guard (PLAN blocks writes)
    → Permission check (ASK/SAVE/AUTO)
    → User approval (if needed)
    → File tool / shell tool execution
    → Result formatted for LLM
  → Result fed back to messages
  → LLM called again for final answer
```

### 5. Configuration System (`config_bootstrap.py`)

Single source of truth for all configurable settings. At startup, `bootstrap_config()` reads `.haney/config.json`, compares against the master `CONFIG_SCHEMA`, and adds any missing keys with defaults. Existing values are never overwritten.

### 6. Mode System

Two orthogonal mode systems:

| System | States | Effect |
|---|---|---|
| Execution mode | PLAN (default), EDIT | Controls which tools are available to the LLM |
| Permission mode | ASK (default), SAVE, AUTO | Controls approval requirements for tool execution |

Both persist in config.json. PLAN mode filters tool definitions before they reach the LLM. Permission mode is checked at execution time.

### 7. Provider Abstraction

`providers.py` defines six providers with base URLs, env key names, and curated model lists. Live model fetching hits the OpenAI-compatible `/models` endpoint when the user is logged in. `thinking_manager.py` maps abstract modes (off/low/medium/high) to provider-specific params.

## Data Flow: Complete Request

```
User types "explain @main.py"
  │
  ▼
chat.py → composer.ask()
  │
  ▼
commands.dispatch() → not a /cmd → session.send("explain @main.py")
  │
  ▼
ChatSession.send():
  ├─ file_ctx.parse_attachments() → ["main.py"]
  ├─ file_ctx.strip_attachments() → "explain"
  ├─ file_ctx.attach_files() → read main.py, display summary
  ├─ search.search("explain") → None (no Exa key)
  ├─ _build_messages("explain", None)
  │   └─ system prompt + project context + attachment context + history
  ├─ _stream_completion()
  │   └─ litellm.completion(stream=True, tools=..., model=...)
  │       └─ Rich Live display streaming Markdown
  ├─ session_mgr.record_usage(tokens)
  ├─ session_mgr.record_message("user"/"assistant")
  └─ _display_response_header()
```

## Design Decisions

**Why not LangChain?** LangChain adds abstraction overhead. LiteLLM provides provider routing directly with minimal surface area. All context management is explicit and visible.

**Why config.json instead of env vars?** Config is project-scoped, human-readable, auto-bootstrapped, and version-controllable (minus secrets). Env vars are supported as fallback for API keys.

**Why trash instead of permanent delete?** Safety. Users recover files with `/restore`. The trash directory is inside `.haney/` alongside other project files.

**Why PLAN as default?** New users shouldn't accidentally modify files. PLAN mode lets them explore safely, then `/edit` when ready.

**Why separate memory.md and summary.md?** Memory is long-term, user-curated project knowledge. Summary is ephemeral, LLM-generated conversation compression. Different lifecycles, different update patterns.

**Why stream + tool-calling together?** Streaming gives real-time feedback. Tool calls accumulate during the stream and execute after it completes. The model re-enters the stream for follow-up responses.
