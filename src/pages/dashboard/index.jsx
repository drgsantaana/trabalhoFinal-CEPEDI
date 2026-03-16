import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

// ─── Dados fictícios (substitua por dados reais do Supabase depois) ───────────
const APOSTAS = [
  { id: 1,  animal: "Avestruz",  emoji: "🦤", valor: 20, ganho: 100, data: "16/03/2026", status: "ganhou"   },
  { id: 2,  animal: "Águia",     emoji: "🦅", valor: 15, ganho: 0,   data: "15/03/2026", status: "perdeu"   },
  { id: 3,  animal: "Burro",     emoji: "🫏", valor: 10, ganho: 0,   data: "14/03/2026", status: "perdeu"   },
  { id: 4,  animal: "Borboleta", emoji: "🦋", valor: 30, ganho: 150, data: "13/03/2026", status: "ganhou"   },
  { id: 5,  animal: "Cachorro",  emoji: "🐶", valor: 25, ganho: 0,   data: "12/03/2026", status: "pendente" },
  { id: 6,  animal: "Cabra",     emoji: "🐐", valor: 10, ganho: 0,   data: "11/03/2026", status: "perdeu"   },
  { id: 7,  animal: "Carneiro",  emoji: "🐑", valor: 20, ganho: 100, data: "10/03/2026", status: "ganhou"   },
  { id: 8,  animal: "Camelo",    emoji: "🐪", valor: 5,  ganho: 0,   data: "09/03/2026", status: "perdeu"   },
  { id: 9,  animal: "Cobra",     emoji: "🐍", valor: 50, ganho: 0,   data: "08/03/2026", status: "perdeu"   },
  { id: 10, animal: "Coelho",    emoji: "🐰", valor: 15, ganho: 75,  data: "07/03/2026", status: "ganhou"   },
];

const SEMANA = [
  { dia: "Seg", valor: 15 },
  { dia: "Ter", valor: 30 },
  { dia: "Qua", valor: 10 },
  { dia: "Qui", valor: 50 },
  { dia: "Sex", valor: 20 },
  { dia: "Sáb", valor: 35 },
  { dia: "Dom", valor: 45 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(nome) {
  if (!nome) return "?";
  return nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function calcularMetricas(apostas) {
  const totalApostado = apostas.reduce((s, a) => s + a.valor, 0);
  const totalGanho    = apostas.reduce((s, a) => s + a.ganho, 0);
  const vitorias      = apostas.filter((a) => a.status === "ganhou").length;
  const taxa          = apostas.length ? Math.round((vitorias / apostas.length) * 100) : 0;
  const saldo         = totalGanho - totalApostado;
  return { totalApostado, totalGanho, saldo, total: apostas.length, vitorias, taxa };
}

function getBichosMaisApostados(apostas) {
  const freq  = {};
  const wins  = {};
  const emoji = {};
  apostas.forEach((a) => {
    freq[a.animal]  = (freq[a.animal]  || 0) + 1;
    emoji[a.animal] = a.emoji;
    if (a.status === "ganhou") wins[a.animal] = true;
  });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([nome, count]) => ({ nome, count, emoji: emoji[nome], ganhou: !!wins[nome] }));
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const styles = {
    ganhou:   "bg-green-500/20 text-green-400",
    perdeu:   "bg-red-500/20 text-red-400",
    pendente: "bg-yellow-500/20 text-yellow-400",
  };
  const labels = { ganhou: "Ganhou", perdeu: "Perdeu", pendente: "Pendente" };
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function MetricCard({ label, value, valueClass = "text-white" }) {
  return (
    <div className="bg-white/10 rounded-xl p-4">
      <p className="text-xs text-white/60 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
const Dashboard = () => {
  const { user } = useAuth(); // ← nome e email vêm daqui
  const [filtro, setFiltro] = useState("todos");

  // Pega o nome ou cai pro email caso não tenha nome cadastrado
  const nomeExibido = user?.name || user?.email || "Usuário";

  const metricas         = calcularMetricas(APOSTAS);
  const bichos           = getBichosMaisApostados(APOSTAS);
  const maxSemana        = Math.max(...SEMANA.map((s) => s.valor));
  const apostasFiltradas = filtro === "todos" ? APOSTAS : APOSTAS.filter((a) => a.status === filtro);

  const saldoClass = metricas.saldo >= 0 ? "text-green-400" : "text-red-400";
  const saldoValor = (metricas.saldo >= 0 ? "+ R$ " : "- R$ ") + Math.abs(metricas.saldo);

  return (
    <div className="flex flex-col min-h-screen text-white p-4 md:p-8 max-w-4xl mx-auto">

      {/* ── Cabeçalho ── */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-base flex-shrink-0">
            {getInitials(nomeExibido)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{nomeExibido}</h1>
            <p className="text-sm text-white/50">{user?.email}</p>
          </div>
        </div>
        <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
          Ativo
        </span>
      </div>

      {/* ── Métricas ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        <MetricCard label="Total apostado"  value={`R$ ${metricas.totalApostado}`} />
        <MetricCard label="Total ganho"     value={`R$ ${metricas.totalGanho}`}    valueClass="text-green-400" />
        <MetricCard label="Saldo"           value={saldoValor}                     valueClass={saldoClass} />
        <MetricCard label="Apostas"         value={metricas.total} />
        <MetricCard label="Vitórias"        value={metricas.vitorias}              valueClass="text-green-400" />
        <MetricCard label="Taxa de acerto"  value={`${metricas.taxa}%`} />
      </div>

      {/* ── Bichos mais apostados ── */}
      <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
        Bichos mais apostados
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        {bichos.map((b) => (
          <div
            key={b.nome}
            className={`rounded-xl p-3 text-center border ${
              b.ganhou
                ? "bg-green-500/10 border-green-500/30"
                : "bg-white/10 border-white/10"
            }`}
          >
            <span className="text-3xl block mb-2">{b.emoji}</span>
            <p className="text-sm font-medium">{b.nome}</p>
            <p className="text-xs text-white/50 mt-1">
              {b.count} aposta{b.count > 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>

      {/* ── Gráfico semanal ── */}
      <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
        Desempenho semanal (R$)
      </h2>
      <div className="bg-white/10 rounded-xl p-4 mb-8">
        {SEMANA.map((s) => (
          <div key={s.dia} className="flex items-center gap-3 mb-3 last:mb-0">
            <span className="text-xs text-white/50 w-8 text-right flex-shrink-0">{s.dia}</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((s.valor / maxSemana) * 100)}%` }}
              />
            </div>
            <span className="text-xs text-white/50 w-12 flex-shrink-0">R$ {s.valor}</span>
          </div>
        ))}
      </div>

      {/* ── Histórico ── */}
      <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
        Histórico de apostas
      </h2>

      {/* Filtros */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["todos", "ganhou", "perdeu", "pendente"].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`text-sm px-4 py-1 rounded-full border transition-colors ${
              filtro === f
                ? "bg-blue-500/20 border-blue-400 text-blue-300"
                : "bg-white/5 border-white/20 text-white/60 hover:bg-white/10"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs text-white/50 font-medium px-4 py-3">Animal</th>
              <th className="text-left text-xs text-white/50 font-medium px-4 py-3">Valor</th>
              <th className="text-left text-xs text-white/50 font-medium px-4 py-3">Data</th>
              <th className="text-left text-xs text-white/50 font-medium px-4 py-3">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {apostasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-white/40 py-8 text-sm">
                  Nenhuma aposta encontrada
                </td>
              </tr>
            ) : (
              apostasFiltradas.map((a) => (
                <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <span className="mr-2">{a.emoji}</span>{a.animal}
                  </td>
                  <td className="px-4 py-3 text-white/80">R$ {a.valor}</td>
                  <td className="px-4 py-3 text-white/80">{a.data}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={a.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;