import { supabase } from "../../lib/supabase";

// ─── Lista de animais do Jogo do Bicho ───────────────────────────────────────
export const ANIMAIS = [
  { animal: "Avestruz",  emoji: "🦤" },
  { animal: "Águia",     emoji: "🦅" },
  { animal: "Burro",     emoji: "🫏" },
  { animal: "Borboleta", emoji: "🦋" },
  { animal: "Cachorro",  emoji: "🐶" },
  { animal: "Cabra",     emoji: "🐐" },
  { animal: "Carneiro",  emoji: "🐑" },
  { animal: "Camelo",    emoji: "🐪" },
  { animal: "Cobra",     emoji: "🐍" },
  { animal: "Coelho",    emoji: "🐰" },
  { animal: "Cavalo",    emoji: "🐴" },
  { animal: "Elefante",  emoji: "🐘" },
  { animal: "Galo",      emoji: "🐓" },
  { animal: "Gato",      emoji: "🐱" },
  { animal: "Jacaré",    emoji: "🐊" },
  { animal: "Leão",      emoji: "🦁" },
  { animal: "Macaco",    emoji: "🐒" },
  { animal: "Porco",     emoji: "🐷" },
  { animal: "Pavão",     emoji: "🦚" },
  { animal: "Peru",      emoji: "🦃" },
  { animal: "Touro",     emoji: "🐂" },
  { animal: "Tigre",     emoji: "🐯" },
  { animal: "Urso",      emoji: "🐻" },
  { animal: "Veado",     emoji: "🦌" },
  { animal: "Vaca",      emoji: "🐄" },
];

// ─── Buscar apostas do usuário ───────────────────────────────────────────────
export async function fetchApostas(userId) {
  const { data, error } = await supabase
    .from("apostas")
    .select("*")
    .eq("user_id", userId)
    .order("data", { ascending: false });

  if (error) throw error;
  return data || [];
}

// ─── Criar nova aposta ──────────────────────────────────────────────────────
export async function criarAposta({ userId, animal, emoji, valor, ganho = 0, status = "pendente", data: dataAposta }) {
  const { data, error } = await supabase
    .from("apostas")
    .insert({
      user_id: userId,
      animal,
      emoji,
      valor,
      ganho,
      data: dataAposta || new Date().toLocaleDateString("pt-BR"),
      status,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
