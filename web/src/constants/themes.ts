type Color = string;

type ColorScale = [string, string, string, string, string, string, string];

export type ThemeConfig = {
  colors: Record<string, Record<string, Color> | Color | ColorScale>;
  components: Record<string, Color>;
  isDark: boolean;
};

const primaryColors = {
  orange: "#fe713a",
  lightGreen: "#03AC5A",
};

const components = {
  job_logs: {
    background: "#24292f",
    font_primary: "#ffffff",
    font_secondary: "#8c959f",
  },

  profiling: {
    chart_system_cpu_border: "rgb(194, 230, 153)",
    chart_system_cpu_background: "rgba(194, 230, 153, 0.5)",
    chart_app_cpu_border: "rgb(49, 163, 84)",
    chart_app_cpu_background: "rgba(49, 163, 84, 0.5)",
    chart_system_memory_border: "rgb(65, 182, 196)",
    chart_system_memory_background: "rgba(65, 182, 196, 0.5)",
    chart_app_memory_border: "rgb(34, 94, 168)",
    chart_app_memory_background: "rgba(34, 94, 168, 0.5)",
  },

  font: {
    default: "nunito, sans-serif",
  },
};

const CommonColors = {
  link_active: "#6e9fff",
  link_visited: "#57acf5",
  tags_bg: "#ddf4ff",
  tags_font: "#0969da",
};

function addComponentsToTheme(theme: ThemeConfig) {
  for (const [component, props] of Object.entries(components)) {
    for (const [name, value] of Object.entries(props)) {
      Object.assign(theme.components, {
        ...theme.components,
        [`${component}_${name}`]: value,
      });
    }
  }

  for (const [colorName, value] of Object.entries(CommonColors)) {
    Object.assign(theme.colors, {
      ...theme.colors,
      [colorName]: value,
    });
  }
  return theme;
}

const LightTheme: ThemeConfig = {
  isDark: false,
  colors: {
    primary: primaryColors.lightGreen,
    bg_primary: "#fff",
    bg_secondary: "#f7f8fa",
    border: "#ededed",

    success: "#30ac6f",
    error: "#d65045",
    warning: "#de882d",
    running: "#5692d7",

    font_primary: "#060606",
    font_secondary: "#96a1af",

    font_white: "#fff",
    backdrop: "rgba(255,255,255,0.8)",
  },
  components: {
    navbar_menu_icon_default_color: "#96a1af",
    navbar_expand_icon_bg: "#fff",

    table_header_bg: "#f7f7f9",
    table_header_color: "#6e6f7a",
    table_row_hover: "#fef5e7",
    table_row_active: "#fef5e7",
  },
};

const darkTheme: ThemeConfig = {
  isDark: true,
  colors: {
    primary: primaryColors.lightGreen,
    bg_primary: "#16151c",
    bg_secondary: "#313038",
    border: "#2d2c31",

    success: "#30ac6f",
    error: "#d65045",
    warning: "#de882d",
    running: "#5692d7",

    font_primary: "#F7F7F9",
    font_secondary: "#707f8c",

    font_white: "#fff",
    backdrop: "rgb(30,28,28,0.8)",
  },
  components: {
    navbar_menu_icon_default_color: "#707f8c",
    navbar_expand_icon_bg: "#1f1e24",

    table_header_bg: "#1f1e26",
    table_header_color: "#b4b3b6",
    table_row_hover: "#3e3e40",
    table_row_active: "#3e3e40",
  },
};

export default {
  light: addComponentsToTheme(LightTheme),
  dark: addComponentsToTheme(darkTheme),
};

export enum THEMES {
  LIGHT = "light",
  DARK = "dark",
}

export const DEFAULT_THEME = THEMES.LIGHT;
