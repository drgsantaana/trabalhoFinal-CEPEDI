import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, X, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ANIMAIS, fetchApostas, criarAposta } from "./data";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function getDesempenhoSemanal(apostas) {
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const totais = {};
  dias.forEach((d) => (totais[d] = 0));

  apostas.forEach((a) => {
    const [dia, mes, ano] = a.data.split("/");
    const date = new Date(ano, mes - 1, dia);
    const diaSemana = dias[date.getDay()];
    totais[diaSemana] += a.valor;
  });

  return dias.filter((d) => d !== "Dom").concat("Dom").map((dia) => ({ dia, valor: totais[dia] }));
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
    <div className="bg-white/10 rounded-xl p-3 sm:p-4">
      <p className="text-[10px] sm:text-xs text-white/60 mb-1">{label}</p>
      <p className={`text-lg sm:text-2xl font-bold ${valueClass} truncate`}>{value}</p>
    </div>
  );
}

function ModalNovaAposta({ onClose, onSave }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [saving, setSaving] = useState(false);

  const onSubmit = async (formData) => {
    setSaving(true);
    try {
      const animalInfo = ANIMAIS.find((a) => a.animal === formData.animal);
      const [ano, mes, dia] = formData.data.split("-");
      await onSave({
        animal: formData.animal,
        emoji: animalInfo?.emoji || "🎲",
        valor: Number(formData.valor),
        ganho: Number(formData.ganho || 0),
        status: formData.status,
        data: `${dia}/${mes}/${ano}`,
      });
      onClose();
    } catch {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Nova aposta</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Animal */}
          <div>
            <label className="text-xs text-white/60 mb-1 block">Animal</label>
            <select
              {...register("animal", { required: "Escolha um animal" })}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
            >
              <option value="" className="bg-slate-800">Selecione...</option>
              {ANIMAIS.map(({ animal, emoji }) => (
                <option key={animal} value={animal} className="bg-slate-800">
                  {emoji} {animal}
                </option>
              ))}
            </select>
            {errors.animal && (
              <p className="text-xs text-red-400 mt-1">{errors.animal.message}</p>
            )}
          </div>

          {/* Data */}
          <div>
            <label className="text-xs text-white/60 mb-1 block">Data</label>
            <input
              type="date"
              {...register("data", { required: "Informe a data" })}
              defaultValue={new Date().toISOString().split("T")[0]}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400 [color-scheme:dark]"
            />
            {errors.data && (
              <p className="text-xs text-red-400 mt-1">{errors.data.message}</p>
            )}
          </div>

          {/* Valor */}
          <div>
            <label className="text-xs text-white/60 mb-1 block">Valor apostado (R$)</label>
            <input
              type="number"
              step="1"
              min="1"
              {...register("valor", {
                required: "Informe o valor",
                min: { value: 1, message: "Valor mínimo: R$ 1" },
              })}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
              placeholder="10"
            />
            {errors.valor && (
              <p className="text-xs text-red-400 mt-1">{errors.valor.message}</p>
            )}
          </div>

          {/* Resultado */}
          <div>
            <label className="text-xs text-white/60 mb-1 block">Resultado</label>
            <select
              {...register("status", { required: "Escolha o resultado" })}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
            >
              <option value="pendente" className="bg-slate-800">Pendente</option>
              <option value="ganhou" className="bg-slate-800">Ganhou</option>
              <option value="perdeu" className="bg-slate-800">Perdeu</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-400 mt-1">{errors.status.message}</p>
            )}
          </div>

          {/* Ganho */}
          <div>
            <label className="text-xs text-white/60 mb-1 block">Valor ganho (R$)</label>
            <input
              type="number"
              step="1"
              min="0"
              {...register("ganho", {
                min: { value: 0, message: "Valor não pode ser negativo" },
              })}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
              placeholder="0"
            />
            {errors.ganho && (
              <p className="text-xs text-red-400 mt-1">{errors.ganho.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {saving ? "Salvando..." : "Apostar"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
const Dashboard = () => {
  const { user } = useAuth();
  const [apostas, setApostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    fetchApostas(user.id)
      .then(setApostas)
      .catch(() => setApostas([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleNovaAposta = async ({ animal, emoji, valor, ganho, status, data }) => {
    const nova = await criarAposta({ userId: user.id, animal, emoji, valor, ganho, status, data });
    setApostas((prev) => [nova, ...prev]);
  };

  const metricas         = calcularMetricas(apostas);
  const bichos           = getBichosMaisApostados(apostas);
  const semana           = getDesempenhoSemanal(apostas);
  const maxSemana        = Math.max(...semana.map((s) => s.valor), 1);
  const apostasFiltradas = filtro === "todos" ? apostas : apostas.filter((a) => a.status === filtro);

  const saldoClass = metricas.saldo >= 0 ? "text-green-400" : "text-red-400";
  const saldoValor = (metricas.saldo >= 0 ? "+ R$ " : "- R$ ") + Math.abs(metricas.saldo);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <Loader2 size={32} className="animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-white px-3 py-4 sm:p-4 md:p-8 max-w-4xl mx-auto w-full pb-20 md:pb-8">

      {/* ── Botão nova aposta (desktop) ── */}
      <div className="hidden md:flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Nova aposta
        </button>
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
      {bichos.length > 0 && (
        <>
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
        </>
      )}

      {/* ── Gráfico semanal ── */}
      <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
        Desempenho semanal (R$)
      </h2>
      <div className="bg-white/10 rounded-xl p-3 sm:p-4 mb-8">
        {semana.map((s) => (
          <div key={s.dia} className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3 last:mb-0">
            <span className="text-[10px] sm:text-xs text-white/50 w-7 sm:w-8 text-right flex-shrink-0">{s.dia}</span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.round((s.valor / maxSemana) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] sm:text-xs text-white/50 w-10 sm:w-12 flex-shrink-0 text-right">R$ {s.valor}</span>
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

      {/* Tabela (desktop) */}
      <div className="hidden md:block bg-white/10 rounded-xl overflow-hidden">
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

      {/* Cards (mobile) */}
      <div className="md:hidden space-y-3">
        {apostasFiltradas.length === 0 ? (
          <div className="bg-white/10 rounded-xl py-8 text-center text-white/40 text-sm">
            Nenhuma aposta encontrada
          </div>
        ) : (
          apostasFiltradas.map((a) => (
            <div key={a.id} className="bg-white/10 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">{a.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{a.animal}</p>
                <p className="text-xs text-white/50">{a.data}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-sm font-semibold">R$ {a.valor}</span>
                <StatusPill status={a.status} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── FAB mobile ── */}
      <button
        onClick={() => setShowModal(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all"
      >
        <Plus size={24} />
      </button>

      {/* ── Modal ── */}
      {showModal && (
        <ModalNovaAposta
          onClose={() => setShowModal(false)}
          onSave={handleNovaAposta}
        />
      )}
    </div>
  );
};

export default Dashboard;
