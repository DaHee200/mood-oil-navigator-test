export const oilRecommendations = [
  {
    id: "lavender",
    name: "라벤더",
    keywords: ["안정", "스트레스", "휴식", "불안", "짜증"],
    description: "라벤더는 스트레스를 완화하고, 숙면을 돕는 대표적인 오일입니다.",
    purchaseLink: "https://yourstore.com/lavender",
    image: "https://placehold.co/400x300.png",
  },
  {
    id: "orange",
    name: "오렌지",
    keywords: ["활력", "에너지", "행복", "집중", "평온"],
    description: "오렌지는 기분을 상쾌하게 하고 활력을 북돋아 줍니다.",
    purchaseLink: "https://yourstore.com/orange",
    image: "https://placehold.co/400x300.png",
  },
  {
    id: "ylang-ylang",
    name: "일랑일랑",
    keywords: ["안정", "스트레스", "휴식", "불안", "행복"],
    description: "일랑일랑은 감정을 완화하고 평온함을 주는 향입니다.",
    purchaseLink: "https://yourstore.com/ylangylang",
    image: "https://placehold.co/400x300.png",
  },
  {
    id: "peppermint",
    name: "페퍼민트",
    keywords: ["활력", "에너지", "집중", "짜증", "스트레스"],
    description: "페퍼민트는 정신을 맑게 해주고 피로를 날려줍니다.",
    purchaseLink: "https://yourstore.com/peppermint",
    image: "https://placehold.co/400x300.png",
  }
];

export type Oil = typeof oilRecommendations[0];
