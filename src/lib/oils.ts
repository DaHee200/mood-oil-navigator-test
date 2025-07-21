export const oilRecommendations = [
  {
    id: "orange",
    name: "오렌지",
    keywords: ["기분변화", "시트러스향", "하루종일"],
    description: "오렌지는 상큼한 향기로 기분을 좋게 만들고, 행복감을 북돋아 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/wild-orange-oil",
    image: "/images/orange.png"
  },
  {
    id: "lavender",
    name: "라벤더",
    keywords: ["불면완화", "꽃향", "밤추천"],
    description: "라벤더는 긴장을 완화하고 불안을 가라앉히며, 차분한 상태로 이끌어 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/lavender-oil",
    image: "/images/lavender.png"
  },
  {
    id: "peppermint",
    name: "페퍼민트",
    keywords: ["두통완화", "허브향", "아침추천"],
    description: "페퍼민트는 정신을 맑게 해주고, 피곤함을 덜어주는 활력 오일입니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/peppermint-oil",
    image: "/images/peppermint.png"
  },
  {
    id: "ylang-ylang",
    name: "일랑일랑",
    keywords: ["긴장완화", "꽃향", "저녁추천"],
    description: "일랑일랑은 감정을 부드럽게 어루만지며, 우울한 기분을 완화시켜 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/ylang-ylang-oil",
    image: "/images/ylangylang.png"
  },
  {
    id: "bergamot",
    name: "베르가못",
    keywords: ["감정진정", "시트러스향", "낮추천"],
    description: "베르가못은 짜증을 가라앉히고 마음의 여유를 되찾게 도와줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/bergamot-oil",
    image: "/images/bergamot.png"
  },
  {
    id: "frankincense",
    name: "프랑킨센스",
    keywords: ["스트레스완화", "나무향", "저녁추천"],
    description: "프랑킨센스는 깊은 호흡을 유도하고 마음을 안정시켜주는 묵직한 향입니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/frankincense-oil",
    image: "/images/frankincense.png"
  }
];

export type Oil = typeof oilRecommendations[0];
