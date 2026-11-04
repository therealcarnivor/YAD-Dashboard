import { css } from "lit";

/** Palette tokens. Widgets only ever reference the --h-* variables. */
export const themeStyles = css`
  .hearth {
    --h-radius: 26px;
    --h-radius-sm: 16px;
    --h-font: var(--hearth-font, "Nunito", "Quicksand", "Segoe UI Variable", var(--ha-font-family-body, Roboto), system-ui, sans-serif);
  }
  .hearth.ha {
    --h-bg: var(--primary-background-color);
    --h-bg-2: var(--secondary-background-color);
    --h-surface: var(--ha-card-background, var(--card-background-color));
    --h-surface-2: var(--secondary-background-color);
    --h-border: var(--divider-color);
    --h-text: var(--primary-text-color);
    --h-muted: var(--secondary-text-color);
    --h-accent: var(--primary-color);
    --h-accent-soft: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
    --h-sage: var(--success-color, #43a047);
    --h-sage-soft: rgba(var(--rgb-success-color, 67, 160, 71), 0.15);
    --h-sky: var(--info-color, #039be5);
    --h-amber: var(--state-light-active-color, var(--warning-color, #ffa600));
    --h-amber-soft: rgba(var(--rgb-warning-color, 255, 166, 0), 0.18);
    --h-shadow: var(--ha-card-box-shadow, none);
  }
`;

/** Shared building blocks used inside every widget's shadow root. */
export const widgetStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    color: var(--h-text);
    font-family: var(--h-font);
    box-sizing: border-box;
    container-type: size;
  }
  * {
    box-sizing: border-box;
  }
  .head {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: var(--h-muted);
    margin-bottom: 12px;
    flex: none;
    white-space: nowrap;
    overflow: hidden;
  }
  .head ha-icon,
  .head ha-state-icon {
    --mdc-icon-size: 20px;
    color: var(--h-accent);
  }
  .head .spacer {
    flex: 1;
  }
  .muted {
    color: var(--h-muted);
  }
  .num {
    font-variant-numeric: tabular-nums;
  }
  .empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--h-muted);
    text-align: center;
    font-size: 0.95rem;
  }
  .empty ha-icon {
    --mdc-icon-size: 36px;
    opacity: 0.6;
  }
  button.round {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--h-surface-2);
    color: var(--h-text);
    cursor: pointer;
    transition: transform 0.15s ease, background 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  button.round:active {
    transform: scale(0.92);
  }
  button.round.primary {
    background: var(--h-accent);
    color: var(--h-on-accent, #fff);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    background: var(--h-surface-2);
    font-size: 0.85rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .chip ha-icon {
    --mdc-icon-size: 16px;
  }
  .scroll {
    overflow-y: auto;
    scrollbar-width: none;
    min-height: 0;
  }
  .scroll::-webkit-scrollbar {
    display: none;
  }
  :host([display-only]) .control {
    display: none !important;
  }
`;
