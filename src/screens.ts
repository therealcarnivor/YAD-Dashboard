export interface ScreenPreset {
  label: string;
  /** Landscape pixel size; swapped for portrait. */
  width: number;
  height: number;
}

export const SCREENS: Record<string, ScreenPreset> = {
  "720p": { label: "HD 720p (1280 × 720)", width: 1280, height: 720 },
  "1080p": { label: "Full HD 1080p (1920 × 1080)", width: 1920, height: 1080 },
  "1440p": { label: "QHD 1440p (2560 × 1440)", width: 2560, height: 1440 },
  "4k": { label: "4K UHD (3840 × 2160)", width: 3840, height: 2160 },
  wsvga: { label: '7" tablet (1024 × 600)', width: 1024, height: 600 },
  wxga: { label: "Tablet 16:10 (1280 × 800)", width: 1280, height: 800 },
  wuxga: { label: "Tablet 16:10 FHD (1920 × 1200)", width: 1920, height: 1200 },
  ipad: { label: "iPad 4:3 (2048 × 1536)", width: 2048, height: 1536 },
};

/**
 * Like an OS display scale: high resolution screens render at a larger UI scale so text
 * stays readable (a 4K panel lays out like 1080p, but sharper).
 */
export const autoScale = (width: number, height: number): number => {
  const short = Math.min(width, height);
  return Math.max(1, Math.round((short / 1080) * 2) / 2);
};
