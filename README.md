 # AIAGP Web Prototype 

AIAGP is an adaptable AI agent platform that uses dynamic system prompts,
vector memory, real-time tools, and human approval rules to assist users
without replacing their judgment.

Primera interfaz del selector de agentes IA configurables, organizada por capas
tecnicas para convertir cada perfil de usuario en un agente ajustable.

## Que incluye

- Selector de agentes por uso: marketing, operaciones, personal y finanzas.
- Configuracion para perfiles personales, equipos o empresas.
- Capa 2: system prompt dinamico segun tipo de agente y datos del usuario.
- Capa 4a: memoria vectorial con embeddings y retrieval contextual.
- Capa 4b: tools para redes sociales, analytics, busqueda web y APIs externas.
- Capa 5: aprendizaje continuo sin fine-tuning constante del LLM base.
- Modos de autonomia: manual, semi-auto y auto limitado.
- Vista previa JSON lista para conectar al backend Python del agente.
- Panel de senales sociales, oportunidades y riesgo de automatizacion.
- Principio central: el agente acompana y recomienda, sin reemplazar al usuario.

## Abrir

Abre `index.html` en el navegador o visita la version publicada en GitHub Pages:

https://slm7-tech.github.io/NEW-ADAPTABLE-IA-AGENT/

## Stack tecnico recomendado

- Frontend: Next.js + TypeScript.
- Backend API: FastAPI (Python).
- Orquestacion: LangChain o LlamaIndex.
- LLM base: Claude API (Anthropic).
- Memoria vectorial: Pinecone, Chroma o Weaviate.
- Base de datos relacional: PostgreSQL.
- Auth: Auth0 o Clerk.
- APIs sociales: Meta Graph API y YouTube Data/Analytics API.

## Regla critica

El agente nunca toma decisiones por el usuario. El system prompt de cada perfil
debe codificar que AIAGP informa, recomienda, explica y pide aprobacion humana
cuando una accion pueda afectar dinero, datos sensibles, reputacion o bienestar.
