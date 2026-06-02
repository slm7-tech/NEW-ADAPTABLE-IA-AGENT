const agents = [
  {
    id: "growth",
    name: "Growth Companion",
    type: "Marketing y ventas",
    description: "Detecta oportunidades comerciales, tendencias sociales y mejoras de conversion.",
    basePrompt: "Eres un agente de crecimiento. Ayudas a interpretar ventas, audiencia y campañas. Recomiendas acciones con datos, pero nunca decides por el usuario.",
    confidence: 92,
    sources: 8,
    sentiment: 0.34,
    opportunities: 12,
    risk: 28,
    insight: "Analizando tendencia social positiva en Instagram y Reddit.",
    modules: ["social_media", "sales_actions", "web_monitor", "notifications"]
  },
  {
    id: "ops",
    name: "Ops Guardian",
    type: "Operaciones",
    description: "Vigila inventario, proveedores, documentos y alertas de ejecucion.",
    basePrompt: "Eres un agente operativo. Priorizas inventario, proveedores, calidad y continuidad. Informas riesgos y solicitas aprobación para cualquier accion sensible.",
    confidence: 88,
    sources: 11,
    sentiment: 0.12,
    opportunities: 7,
    risk: 36,
    insight: "Priorizando stock critico, variacion de demanda y rutas de proveedor.",
    modules: ["data_analysis", "document_analysis", "purchasing", "notifications"]
  },
  {
    id: "personal",
    name: "Personal Ally",
    type: "Uso personal",
    description: "Aprende preferencias, organiza objetivos y acompana decisiones cotidianas.",
    basePrompt: "Eres un agente personal de apoyo. Recuerdas preferencias con consentimiento, sugieres opciones y fortaleces la autonomía del usuario sin sustituir su criterio.",
    confidence: 95,
    sources: 5,
    sentiment: 0.22,
    opportunities: 9,
    risk: 18,
    insight: "Optimizando recomendaciones según memoria aprobada por el usuario.",
    modules: ["memory", "calendar", "documents", "notifications"]
  },
  {
    id: "finance",
    name: "Finance Sentinel",
    type: "Finanzas",
    description: "Cruza KPIs, presupuestos, reportes y riesgo antes de recomendar acciones.",
    basePrompt: "Eres un agente financiero prudente. Analizas presupuestos, margenes y riesgos. Nunca ejecutas decisiones financieras sin aprobación humana explícita.",
    confidence: 86,
    sources: 9,
    sentiment: -0.08,
    opportunities: 5,
    risk: 42,
    insight: "Revisando gasto mensual, variacion de margen y alertas de presupuesto.",
    modules: ["data_analysis", "document_analysis", "risk_engine", "approval_flow"]
  }
];

const autonomyModes = {
  1: { label: "Manual", config: "manual" },
  2: { label: "Proponer y pedir aprobacion", config: "semi-auto" },
  3: { label: "Auto limitado con aprobacion sensible", config: "auto-limitado" }
};

const profilePrompts = {
  personal: "Perfil personal: adapta el lenguaje a objetivos, habitos, preferencias y limites definidos por el usuario.",
  empresa: "Perfil empresarial: prioriza KPIs, cumplimiento, trazabilidad, roles internos y aprobación humana.",
  creator: "Perfil creador de contenido: prioriza audiencia, calendario editorial, rendimiento de publicaciones y datos de plataformas.",
  equipo: "Perfil de equipo especializado: coordina tareas, ownership, permisos y reportes accionables por rol."
};

let selectedAgent = agents[0];

const els = {
  grid: document.querySelector("#agentGrid"),
  heroAgentName: document.querySelector("#heroAgentName"),
  confidenceMetric: document.querySelector("#confidenceMetric"),
  sourcesMetric: document.querySelector("#sourcesMetric"),
  modeMetric: document.querySelector("#modeMetric"),
  liveInsight: document.querySelector("#liveInsight"),
  selectedAgentTitle: document.querySelector("#selectedAgentTitle"),
  configPreview: document.querySelector("#configPreview"),
  profileType: document.querySelector("#profileType"),
  industry: document.querySelector("#industry"),
  autonomy: document.querySelector("#autonomy"),
  autonomyLabel: document.querySelector("#autonomyLabel"),
  memoryEnabled: document.querySelector("#memoryEnabled"),
  socialEnabled: document.querySelector("#socialEnabled"),
  humanGuardrails: document.querySelector("#humanGuardrails"),
  sentimentValue: document.querySelector("#sentimentValue"),
  opportunityValue: document.querySelector("#opportunityValue"),
  riskValue: document.querySelector("#riskValue"),
  sentimentMeter: document.querySelector("#sentimentMeter"),
  opportunityMeter: document.querySelector("#opportunityMeter"),
  riskMeter: document.querySelector("#riskMeter")
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getRequiredElements() {
  return Object.entries(els)
    .filter(([, element]) => !element)
    .map(([key]) => key);
}

function renderAgents() {
  els.grid.innerHTML = agents
    .map((agent) => `
      <button class="agent-card" type="button" data-agent="${escapeHtml(agent.id)}" aria-pressed="${agent.id === selectedAgent.id}">
        <span class="agent-type">${escapeHtml(agent.type)}</span>
        <h3>${escapeHtml(agent.name)}</h3>
        <p>${escapeHtml(agent.description)}</p>
        <ul>
          ${agent.modules.slice(0, 3).map((module) => `<li>${escapeHtml(module)}</li>`).join("")}
        </ul>
      </button>
    `)
    .join("");

  document.querySelectorAll("[data-agent]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedAgent = agents.find((agent) => agent.id === button.dataset.agent) || selectedAgent;
      renderAgents();
      renderState();
    });
  });
}

function renderState() {
  const mode = autonomyModes[els.autonomy.value];
  const riskLabel = selectedAgent.risk < 30 ? "Bajo" : selectedAgent.risk < 45 ? "Medio" : "Alto";
  const profilePrompt = profilePrompts[els.profileType.value] || profilePrompts.empresa;

  els.heroAgentName.textContent = selectedAgent.name;
  els.confidenceMetric.textContent = `${selectedAgent.confidence}%`;
  els.sourcesMetric.textContent = selectedAgent.sources;
  els.modeMetric.textContent = mode.config;
  els.liveInsight.textContent = selectedAgent.insight;
  els.selectedAgentTitle.textContent = selectedAgent.name;
  els.autonomyLabel.textContent = mode.label;
  els.sentimentValue.textContent = selectedAgent.sentiment > 0 ? `+${selectedAgent.sentiment}` : selectedAgent.sentiment;
  els.opportunityValue.textContent = selectedAgent.opportunities;
  els.riskValue.textContent = riskLabel;

  els.sentimentMeter.value = selectedAgent.sentiment;
  els.opportunityMeter.value = selectedAgent.opportunities;
  els.riskMeter.value = selectedAgent.risk;

  const config = {
    layer_2_dynamic_configuration: {
      selected_agent: selectedAgent.name,
      profile: els.profileType.value,
      domain: els.industry.value.toLowerCase(),
      llm_base: "Claude API",
      system_prompt_strategy: "base_prompt_por_perfil + datos_del_usuario + reglas_de_seguridad",
      system_prompt: [
        selectedAgent.basePrompt,
        profilePrompt,
        "Regla crítica: informa, recomienda y pide aprobación. Nunca reemplaces la decision del usuario."
      ].join(" ")
    },
    layer_4a_user_memory: {
      enabled: els.memoryEnabled.checked,
      type: "vector_database",
      recommended_providers: ["Pinecone", "Chroma", "Weaviate"],
      embedding_flow: "conversacion -> embeddings -> retrieval_por_contexto_relevante",
      stores_literal_memory: false,
      consent_required: true,
      user_can_delete_history: true
    },
    layer_4b_realtime_tools: {
      enabled: els.socialEnabled.checked,
      orchestration: ["LangChain", "LlamaIndex", "tool_calling_nativo_Claude_GPT"],
      tools: [
        "Meta Graph API",
        "YouTube Data API",
        "YouTube Analytics API",
        "búsqueda_web",
        "CRM_o_ERP_API"
      ],
      call_policy: "el LLM decide cuando consultar datos externos según la tarea"
    },
    layer_5_continuous_learning: {
      fine_tune_base_model_continuously: false,
      updates: [
        "actualizar_embeddings_del_perfil_con_cada_interaccion",
        "ajustar_pesos_de_retrieval",
        "RLHF_ligero_con_feedback_del_usuario"
      ],
      goal: "mejorar recomendaciones futuras sin crear dependencia negativa"
    },
    safety_contract: {
      mode: mode.config,
      active_modules: selectedAgent.modules,
      guardrails: {
        human_approval: els.humanGuardrails.checked,
        blocked_auto_actions: ["compras_altas", "cambios_financieros", "datos_sensibles"]
      }
    },
    recommended_stack: {
      frontend: "Next.js + TypeScript",
      backend_api: "FastAPI (Python)",
      orchestration: "LangChain o LlamaIndex",
      vector_memory: "Pinecone o Chroma",
      relational_database: "PostgreSQL",
      auth: "Auth0 o Clerk"
    }
  };

  els.configPreview.textContent = JSON.stringify(config, null, 2);
}

[
  els.profileType,
  els.industry,
  els.autonomy,
  els.memoryEnabled,
  els.socialEnabled,
  els.humanGuardrails
].forEach((control) => {
  control?.addEventListener("input", renderState);
  control?.addEventListener("change", renderState);
});

const missingElements = getRequiredElements();

if (missingElements.length > 0) {
  console.error("AIAGP: faltan elementos requeridos", missingElements);
} else {
  renderAgents();
  renderState();
}
