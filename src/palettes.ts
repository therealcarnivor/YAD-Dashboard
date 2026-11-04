/** Colour palettes. Each palette has a light and dark variant; all other tokens are derived. */

export interface PaletteColors {
  /** Page background. */
  background: string;
  /** Tile background. */
  surface: string;
  /** Main text colour. */
  text: string;
  /** Highlight colour for icons, active states and buttons. */
  accent: string;
  /** Secondary text. Derived from text + surface when omitted. */
  muted?: string;
  /** "Good / on / home" colour. */
  success?: string;
  /** Cool/informational colour (cooling, rain, solar). */
  info?: string;
  /** Warm colour (lights on, heating, sun). */
  warm?: string;
}

export interface Palette {
  label: string;
  description: string;
  light: PaletteColors;
  dark: PaletteColors;
}

export const PALETTES: Record<string, Palette> = {
  hearth: {
    label: "Hearth",
    description: "Warm cream & terracotta",
    light: { background: "#f3eee7", surface: "#fffcf7", text: "#2f2a25", muted: "#8c8278", accent: "#d4774f", success: "#6f9273", info: "#5f8fb4", warm: "#e8a93a" },
    dark: { background: "#191714", surface: "#27231f", text: "#f3ece3", muted: "#a1978c", accent: "#eb956e", success: "#95b598", info: "#86b2d4", warm: "#f0b955" },
  },
  scandi: {
    label: "Scandi oak",
    description: "Pale oak, linen & charcoal",
    light: { background: "#f5f2ec", surface: "#fffefb", text: "#2b2926", muted: "#8a847b", accent: "#b0834f", success: "#7a9a7e", info: "#6f93ad", warm: "#dca44a" },
    dark: { background: "#1a1816", surface: "#252220", text: "#f1ece4", muted: "#a49c91", accent: "#d4a671", success: "#9dbb9f", info: "#93b4cc", warm: "#ecbb63" },
  },
  nordic: {
    label: "Nordic",
    description: "Cool greys & fjord blue",
    light: { background: "#eef1f4", surface: "#ffffff", text: "#1f2933", muted: "#7b8794", accent: "#4c7a9f", success: "#5f9488", info: "#5b8fc9", warm: "#e0a13a" },
    dark: { background: "#14181d", surface: "#20262e", text: "#e8edf2", muted: "#95a1ae", accent: "#7fb0d6", success: "#86c0b2", info: "#8ab8e6", warm: "#f0b955" },
  },
  cottage: {
    label: "Cottage garden",
    description: "Sage greens & soft stone",
    light: { background: "#eef1ea", surface: "#fbfcf8", text: "#26302a", muted: "#7d8a80", accent: "#6b8f5e", success: "#4f8a7a", info: "#5e8db0", warm: "#d99a3a" },
    dark: { background: "#161a16", surface: "#232923", text: "#e9eee6", muted: "#9aa597", accent: "#9cc08e", success: "#86c2b0", info: "#8fb6d4", warm: "#e9b65e" },
  },
  coastal: {
    label: "Coastal",
    description: "Sand, sea glass & teal",
    light: { background: "#f2f0ea", surface: "#fffdf8", text: "#1e3240", muted: "#7a8a92", accent: "#2f7f8c", success: "#6c9a7c", info: "#4f8fbf", warm: "#e3a24b" },
    dark: { background: "#0f1a20", surface: "#182a33", text: "#e6f0f2", muted: "#8ea6ae", accent: "#5fb7c2", success: "#8cc2a0", info: "#7fb6de", warm: "#f0b765" },
  },
  lavender: {
    label: "Lavender",
    description: "Soft lilac & blush",
    light: { background: "#f4f0f5", surface: "#fffcff", text: "#2e2633", muted: "#8a7f90", accent: "#8a6bb0", success: "#6f9a86", info: "#6a8fc7", warm: "#e0a24a" },
    dark: { background: "#18151c", surface: "#26202d", text: "#efe9f3", muted: "#a59cad", accent: "#b79ae0", success: "#93c2ab", info: "#95b4e4", warm: "#efba63" },
  },
  rose: {
    label: "Rosewood",
    description: "Dusty pink & warm plum",
    light: { background: "#f6efee", surface: "#fffbfa", text: "#33262a", muted: "#907d81", accent: "#b9616f", success: "#6f9a83", info: "#6a8db6", warm: "#e2a04c" },
    dark: { background: "#1b1415", surface: "#2a1f21", text: "#f4e9ea", muted: "#ab9a9d", accent: "#e28e9a", success: "#96c2a8", info: "#93b2d8", warm: "#efb866" },
  },
  urban: {
    label: "Urban loft",
    description: "Concrete grey & rust",
    light: { background: "#f0f0ee", surface: "#ffffff", text: "#1c1c1c", muted: "#7c7c78", accent: "#c2552d", success: "#5f8f6f", info: "#4f7fae", warm: "#d99a2b" },
    dark: { background: "#121212", surface: "#1f1f1f", text: "#f0f0ee", muted: "#9a9a96", accent: "#e8794f", success: "#86b996", info: "#7ea9d6", warm: "#ebb04c" },
  },
  indigo: {
    label: "Midnight indigo",
    description: "Ink blue & electric violet",
    light: { background: "#eef0f7", surface: "#ffffff", text: "#1d2040", muted: "#7c80a0", accent: "#5161d6", success: "#4f9a8a", info: "#4e8fd0", warm: "#e19d3c" },
    dark: { background: "#0e1020", surface: "#181b33", text: "#e8eaff", muted: "#9599c0", accent: "#8592ff", success: "#7fc6b6", info: "#86b7f0", warm: "#f0b95a" },
  },
};

export type CustomPalette = Partial<Record<"light" | "dark", Partial<PaletteColors>>>;

const mix = (a: string, b: string, pct: number) => `color-mix(in srgb, ${a} ${pct}%, ${b})`;
const soft = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`;

/** Turns a palette into the --h-* CSS variables used by every widget. */
export const paletteVars = (colors: PaletteColors, dark: boolean): Record<string, string> => {
  const { background: bg, surface, text, accent } = colors;
  const success = colors.success ?? (dark ? "#95b598" : "#6f9273");
  const info = colors.info ?? (dark ? "#86b2d4" : "#5f8fb4");
  const warm = colors.warm ?? (dark ? "#f0b955" : "#e8a93a");
  return {
    "--h-bg": bg,
    "--h-bg-2": mix(bg, dark ? "#ffffff" : text, dark ? 94 : 95),
    "--h-surface": soft(surface, 92),
    "--h-surface-2": mix(surface, text, dark ? 90 : 94),
    "--h-border": soft(text, dark ? 6 : 7),
    "--h-text": text,
    "--h-muted": colors.muted ?? mix(text, surface, 55),
    "--h-accent": accent,
    "--h-accent-soft": soft(accent, dark ? 16 : 14),
    "--h-on-accent": dark ? bg : "#ffffff",
    "--h-sage": success,
    "--h-sage-soft": soft(success, 16),
    "--h-sky": info,
    "--h-amber": warm,
    "--h-amber-soft": soft(warm, 18),
    "--h-shadow": dark
      ? "0 1px 2px rgba(0, 0, 0, 0.3), 0 12px 32px -14px rgba(0, 0, 0, 0.6)"
      : `0 1px 2px ${soft(text, 5)}, 0 10px 30px -12px ${soft(text, 14)}`,
  };
};

/** Resolves the palette for a mode, layering custom colours over the base palette. */
export const resolvePalette = (name: string | undefined, dark: boolean, custom?: CustomPalette): PaletteColors => {
  const mode = dark ? "dark" : "light";
  if (name === "custom") {
    const base = PALETTES.hearth[mode];
    const overrides = Object.fromEntries(Object.entries(custom?.[mode] ?? {}).filter(([, v]) => !!v));
    // Muted text is tuned per palette, so re-derive it once the user changes text or tiles.
    const muted = overrides.text || overrides.surface ? undefined : base.muted;
    return { ...base, muted, ...overrides };
  }
  return (PALETTES[name ?? "hearth"] ?? PALETTES.hearth)[mode];
};
