export const oilRecommendations = [
  {
    id: "lavender",
    name: "라벤더",
    keywords: ["불안", "안정", "꽃", "밤"],
    description: "라벤더는 스트레스를 완화하고, 숙면을 돕는 대표적인 오일입니다.",
    purchaseLink: "https://yourstore.com/lavender",
    image: "/images/lavender.jpg",
  },
  {
    id: "orange",
    name: "오렌지",
    keywords: ["피로", "활력", "과일", "아침"],
    description: "오렌지는 기분을 상쾌하게 하고 활력을 북돋아 줍니다.",
    purchaseLink: "https://yourstore.com/orange",
    image: "/images/orange.jpg",
  },
  {
    id: "ylang-ylang",
    name: "일랑일랑",
    keywords: ["불안", "안정", "꽃", "밤"],
    description: "일랑일랑은 감정을 완화하고 평온함을 주는 향입니다.",
    purchaseLink: "https://yourstore.com/ylangylang",
    image: "/images/ylangylang.jpg",
  },
  {
    id: "peppermint",
    name: "페퍼민트",
    keywords: ["피로", "활력", "과일", "아침"],
    description: "페퍼민트는 정신을 맑게 해주고 피로를 날려줍니다.",
    purchaseLink: "https://yourstore.com/peppermint",
    image: "/images/peppermint.jpg",
  },
  {
    id: "bergamot",
    name: "베르가못",
    keywords: ["피로", "활력", "과일", "아침", "불안"],
    description: "베르가못은 상큼한 향으로 기분을 밝게 하고 스트레스 해소에 도움을 줍니다.",
    purchaseLink: "https://yourstore.com/bergamot",
    image: "/images/bergamot.jpg",
  }
];

export type Oil = typeof oilRecommendations[0];
