 # AIAGP Web Prototype 

AIAGP es una plataforma de agentes IA adaptables que usa prompts dinámicos,
memoria vectorial, herramientas en tiempo real y reglas de aprobación humana para
asistir a los usuarios sin reemplazar su criterio.

Primera interfaz del selector de agentes IA configurables, organizada por capas
técnicas para convertir cada perfil de usuario en un agente ajustable.

## Qué incluye

- Selector de agentes por uso: marketing, operaciones, personal y finanzas.
- Configuración para perfiles personales, equipos o empresas.
- Capa 2: prompt dinámico según tipo de agente y datos del usuario.
- Capa 4a: memoria vectorial con embeddings y retrieval contextual.
- Capa 4b: herramientas para redes sociales, analytics, búsqueda web y APIs externas.
- Capa 5: aprendizaje continuo sin fine-tuning constante del LLM base.
- Modos de autonomía: manual, semi-auto y auto limitado.
- Vista previa JSON lista para conectar al backend Python del agente.
- Panel de señales sociales, oportunidades y riesgo de automatización.
- Principio central: el agente acompaña y recomienda, sin reemplazar al usuario.

## Abrir

Abre `index.html` en el navegador o visita la versión publicada en GitHub Pages:

https://slm7-tech.github.io/NEW-ADAPTABLE-IA-AGENT/

## Stack técnico recomendado

- Frontend: Next.js + TypeScript.
- Backend API: FastAPI (Python).
- Orquestación: LangChain o LlamaIndex.
- LLM base: Claude API (Anthropic).
- Memoria vectorial: Pinecone, Chroma o Weaviate.
- Base de datos relacional: PostgreSQL.
- Auth: Auth0 o Clerk.
- APIs sociales: Meta Graph API y YouTube Data/Analytics API.

## Regla crítica

El agente nunca toma decisiones por el usuario. El prompt de cada perfil
debe codificar que AIAGP informa, recomienda, explica y pide aprobación humana
cuando una acción pueda afectar dinero, datos sensibles, reputación o bienestar.
