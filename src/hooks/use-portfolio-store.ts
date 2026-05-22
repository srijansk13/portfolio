import { create } from "zustand";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";



export interface TerminalLog {
  line: string;
  type: "input" | "output" | "error" | "success";
}

export interface ToastNotification {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
}

export interface ThemeSettings {
  accentColor: "blue" | "violet" | "cyan" | "pink" | "emerald";
  accentHex: string;
  particleDensity: "low" | "medium" | "high";
  glowEnabled: boolean;
  matrixMode: boolean;
}

const ACCENT_COLORS = {
  blue: "#0062ff",
  violet: "#7000ff",
  cyan: "#00f0ff",
  pink: "#ff007f",
  emerald: "#10b981",
};

interface PortfolioState {
  // Theme customizer
  theme: ThemeSettings;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
  

  
  // Command palette
  isPaletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  
  // Developer Terminal
  isTerminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  terminalLogs: TerminalLog[];
  runTerminalCommand: (cmd: string) => void;
  
  // Toast notifications
  toasts: ToastNotification[];
  addToast: (message: string, type?: ToastNotification["type"]) => void;
  removeToast: (id: string) => void;
  
  // Achievements unlocked
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  // Theme settings
  theme: {
    accentColor: "emerald",
    accentHex: "#10b981",
    particleDensity: "medium",
    glowEnabled: true,
    matrixMode: false,
  },
  updateTheme: (settings) => set((state) => {
    const updated = { ...state.theme, ...settings };
    if (settings.accentColor) {
      updated.accentHex = ACCENT_COLORS[settings.accentColor];
    }
    return { theme: updated };
  }),



  // Command palette
  isPaletteOpen: false,
  setPaletteOpen: (open) => set({ isPaletteOpen: open }),

  // Developer terminal
  isTerminalOpen: false,
  setTerminalOpen: (open) => set({ isTerminalOpen: open }),
  terminalLogs: [
    { line: "SK.OS Terminal v1.0.0 — Srijan Kumar Goud", type: "success" },
    { line: "Type 'help' to see available commands.", type: "output" },
    { line: "", type: "output" },
  ],
  runTerminalCommand: (command) => {
    const trimmed = command.trim();
    if (!trimmed) return;
    
    const args = trimmed.split(" ");
    const cmd = args[0].toLowerCase();
    
    const logs = [...get().terminalLogs, { line: `guest@sk-os:~$ ${command}`, type: "input" as const }];
    
    switch (cmd) {
      case "help":
        logs.push(
          { line: "Available commands:", type: "success" },
          { line: "  about       - Overview of Srijan Kumar Goud", type: "output" },
          { line: "  skills      - List core tech stack & capabilities", type: "output" },
          { line: "  projects    - List featured engineering projects", type: "output" },
          { line: "  contact     - Show email and social contact links", type: "output" },
          { line: "  education   - Show academic background", type: "output" },
          { line: "  resume      - Open resume PDF in new tab", type: "output" },
          { line: "  theme [col] - Switch accent (blue, violet, cyan, pink, emerald)", type: "output" },
          { line: "  matrix      - Toggle matrix screensaver mode", type: "output" },
          { line: "  sudo        - Request superuser access", type: "output" },
          { line: "  clear       - Clear terminal output", type: "output" }
        );
        break;
      case "about":
        logs.push({ line: PORTFOLIO_DATA.personal.bio, type: "output" });
        logs.push({ line: `Location: ${PORTFOLIO_DATA.personal.location}`, type: "output" });
        break;
      case "skills":
        logs.push({ line: "Core Competencies:", type: "success" });
        PORTFOLIO_DATA.skills.slice(0, 8).forEach(s => {
          logs.push({ line: `  * ${s.name} [Proficiency: ${s.level}%]`, type: "output" });
        });
        break;
      case "projects":
        logs.push({ line: "Recent Engineering Launches:", type: "success" });
        PORTFOLIO_DATA.projects.forEach(p => {
          logs.push({ line: `  * ${p.name} (${p.category}) - ${p.shortDesc}`, type: "output" });
        });
        break;
      case "contact":
        logs.push(
          { line: `Email:     ${PORTFOLIO_DATA.personal.email}`, type: "output" },
          { line: `GitHub:    ${PORTFOLIO_DATA.personal.socials.github}`, type: "output" },
          { line: `LinkedIn:  ${PORTFOLIO_DATA.personal.socials.linkedin}`, type: "output" },
          { line: `WhatsApp:  ${PORTFOLIO_DATA.personal.socials.whatsapp}`, type: "output" }
        );
        break;
      case "theme":
        const color = args[1] as ThemeSettings["accentColor"];
        if (["blue", "violet", "cyan", "pink", "emerald"].includes(color)) {
          get().updateTheme({ accentColor: color });
          logs.push({ line: `Theme accent color switched to ${color}.`, type: "success" });
        } else {
          logs.push({ line: "Error: Invalid color option. Choose blue, violet, cyan, pink, or emerald.", type: "error" });
        }
        break;
      case "matrix":
        get().updateTheme({ matrixMode: !get().theme.matrixMode });
        logs.push({ line: `Matrix mode ${!get().theme.matrixMode ? "deactivated" : "activated"}.`, type: "success" });
        if (!get().theme.matrixMode) {
          get().unlockAchievement("matrix_mode");
        }
        break;
      case "sudo":
        logs.push({ line: "Access Denied. User 'guest' is not in the sudoers file. This incident has been logged.", type: "error" });
        get().unlockAchievement("sudo_fail");
        break;
      case "clear":
        set({ terminalLogs: [] });
        return;
      case "education":
        logs.push({ line: "Academic Background:", type: "success" });
        PORTFOLIO_DATA.education.forEach(e => {
          logs.push({ line: `  ${e.degree} — ${e.institution} (${e.gradeLabel}: ${e.grade})`, type: "output" });
        });
        break;
      case "resume":
        logs.push(
          { line: "📄 Resume: Srijan Kumar Goud", type: "success" },
          { line: `   URL: ${PORTFOLIO_DATA.personal.resumeUrl}`, type: "output" },
          { line: "   Opening in new tab...", type: "output" }
        );
        if (typeof window !== "undefined" && PORTFOLIO_DATA.personal.resumeUrl) {
          window.open(PORTFOLIO_DATA.personal.resumeUrl, "_blank", "noopener,noreferrer");
        }
        break;
      default:
        logs.push({ line: `sk-os: command not found: '${cmd}'. Type 'help' for options.`, type: "error" });
    }
    
    set({ terminalLogs: logs });
  },

  // Toast Notifications
  toasts: [],
  addToast: (message, type = "info") => {
    const id = Math.random().toString();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 4000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),

  // Achievements
  unlockedAchievements: [],
  unlockAchievement: (id) => {
    if (get().unlockedAchievements.includes(id)) return;
    set((state) => ({ unlockedAchievements: [...state.unlockedAchievements, id] }));
    
    let achTitle = "Easter Egg Unlocked!";
    if (id === "sudo_fail") achTitle = "Security Breach? [sudo fail]";
    if (id === "matrix_mode") achTitle = "Entered the Matrix";
    if (id === "chat_master") achTitle = "AI conversationalist";
    if (id === "konami") achTitle = "Konami Code Activated!";
    
    get().addToast(`🏆 Achievement Unlocked: ${achTitle}`, "success");
    // Trigger confetti if on client
    if (typeof window !== "undefined") {
      import("canvas-confetti").then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#0062ff", "#7000ff", "#00f0ff"]
        });
      });
    }
  }
}));


