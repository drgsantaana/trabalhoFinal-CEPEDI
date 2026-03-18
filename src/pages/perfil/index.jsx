import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, User, Shield, Calendar, ArrowLeft } from "lucide-react";

const Perfil = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isOwnProfile = user?.id === id;

  if (!user) return null;

  const initials = (user.name || user.email || "?")
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col min-h-screen text-white p-4 md:p-8 max-w-2xl mx-auto">
      {/* Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 w-fit"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      {/* Card do perfil */}
      <div className="bg-white/10 rounded-2xl p-6 md:p-8">
        {/* Avatar + Nome */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-2xl mb-4">
            {initials}
          </div>
          <h1 className="text-2xl font-bold">{user.name || "Sem nome"}</h1>
          {isOwnProfile && (
            <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full mt-2">
              Seu perfil
            </span>
          )}
        </div>

        {/* Informações */}
        <div className="space-y-4">
          <InfoRow icon={<Mail size={16} />} label="Email" value={user.email} />
          <InfoRow
            icon={<User size={16} />}
            label="Nome"
            value={user.name || "Não informado"}
          />
          <InfoRow
            icon={<Shield size={16} />}
            label="ID"
            value={id}
          />
          <InfoRow
            icon={<Calendar size={16} />}
            label="Status"
            value="Ativo"
            valueClass="text-green-400"
          />
        </div>
      </div>
    </div>
  );
};

function InfoRow({ icon, label, value, valueClass = "text-white/80" }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
      <span className="text-slate-400">{icon}</span>
      <span className="text-sm text-white/50 w-16">{label}</span>
      <span className={`text-sm ${valueClass} break-all`}>{value}</span>
    </div>
  );
}

export default Perfil;
