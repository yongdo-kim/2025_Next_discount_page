export const COLOR_THEMES = {
  yellow: {
    bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
    hover:
      "hover:text-white hover:border-yellow-400 hover:bg-gradient-to-br from-yellow-400 to-yellow-500",
    selected:
      "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-yellow-500",
  },
  red: {
    bg: "bg-red-50 text-red-700 border-red-200",
    hover:
      "hover:text-white hover:border-red-400 hover:bg-gradient-to-br from-red-400 to-red-500",
    selected:
      "bg-gradient-to-br from-red-500 to-red-700 text-white border-red-500",
  },
  green: {
    bg: "bg-green-50 text-green-700 border-green-200",
    hover:
      "hover:text-white hover:border-green-400 hover:bg-gradient-to-br from-green-400 to-green-500",
    selected:
      "bg-gradient-to-br from-green-500 to-green-700 text-white border-green-500",
  },
  sky: {
    bg: "bg-sky-50 text-sky-700 border-sky-200",
    hover:
      "hover:text-white hover:border-sky-400 hover:bg-gradient-to-br from-sky-400 to-sky-500",
    selected:
      "bg-gradient-to-br from-sky-400 to-sky-600 text-white border-sky-500",
  },
  emerald: {
    bg: "bg-gray-50 text-gray-700 border-gray-200",
    hover:
      "hover:text-white hover:border-emerald-400 hover:bg-gradient-to-br from-emerald-400 to-emerald-500",
    selected:
      "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white border-emerald-500",
  },
  pink: {
    bg: "bg-gray-50 text-gray-700 border-gray-200",
    hover:
      "hover:text-white hover:border-pink-400 hover:bg-gradient-to-br from-pink-500 to-red-500",
    selected:
      "bg-gradient-to-br from-pink-500 to-pink-600 text-white border-pink-500",
  },
} as const;

export const CATEGORY_COLORS = {
  카카오: COLOR_THEMES.yellow,
  쿠팡: COLOR_THEMES.red,
  옥션: COLOR_THEMES.red,
  전체보기: COLOR_THEMES.green,
  네이버: COLOR_THEMES.green,
  오늘의집: COLOR_THEMES.sky,
  G마켓: COLOR_THEMES.emerald,
  지마켓: COLOR_THEMES.emerald,
  "11번가": COLOR_THEMES.pink,
  이벤트: COLOR_THEMES.green,
  기타: COLOR_THEMES.sky,
  톡딜: COLOR_THEMES.yellow,
} as const;

export type CategoryColorTheme =
  (typeof COLOR_THEMES)[keyof typeof COLOR_THEMES];
export type CategoryName = keyof typeof CATEGORY_COLORS;

export function getCategoryColors(
  categoryName: string,
): CategoryColorTheme | undefined {
  return CATEGORY_COLORS[categoryName as CategoryName];
}
