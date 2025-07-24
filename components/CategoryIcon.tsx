import {
  Gamepad,
  Gift,
  HelpCircle,
  Monitor,
  Shirt,
  ShoppingBasket,
  Speaker,
  Utensils,
} from "lucide-react";

export function CategoryIcon(
  category: string,
  props?: { size?: number; color?: string },
) {
  const lower = category.toLowerCase();
  if (lower.includes("게임")) return <Gamepad {...props} />;
  if (lower.includes("상품권")) return <Gift {...props} />;
  if (lower.includes("생활용품")) return <ShoppingBasket {...props} />;
  if (lower.includes("음식")) return <Utensils {...props} />;
  if (lower.includes("의류")) return <Shirt {...props} />;
  if (lower.includes("a/v")) return <Speaker {...props} />;
  if (lower.includes("pc/가전")) return <Monitor {...props} />;
  return <HelpCircle {...props} />;
}
