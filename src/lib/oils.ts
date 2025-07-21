export const oilRecommendations = [
  {
    id: "orange",
    name: "오렌지",
    keywords: ["기분전환", "밤추천", "상큼한향"],
    description: "오렌지는 상큼한 향기로 기분을 좋게 만들고, 행복감을 북돋아 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/wild-orange-oil",
    image: "/images/orange.png"
  },
  {
    id: "lavender",
    name: "라벤더",
    keywords: ["불안완화", "차분함", "밤추천", "감정진정"],
    description: "라벤더는 긴장을 완화하고 불안을 가라앉히며, 차분한 상태로 이끌어 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/lavender-oil",
    image: "/images/lavender.png"
  },
  {
    id: "peppermint",
    name: "페퍼민트",
    keywords: ["피로회복", "집중력"],
    description: "페퍼민트는 정신을 맑게 해주고, 피곤함을 덜어주는 활력 오일입니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/peppermint-oil",
    image: "/images/peppermint.png"
  },
  {
    id: "ylang-ylang",
    name: "일랑일랑",
    keywords: ["우울완화", "행복감", "밤추천"],
    description: "일랑일랑은 감정을 부드럽게 어루만지며, 우울한 기분을 완화시켜 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/ylang-ylang-oil",
    image: "/images/ylangylang.png"
  },
  {
    id: "bergamot",
    name: "베르가못",
    keywords: ["감정진정", "스트레스완화", "짜증완화", "불안완화", "우울완화"],
    description: "베르가못은 짜증을 가라앉히고 마음의 여유를 되찾게 도와줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/bergamot-oil",
    image: "/images/bergamot.png"
  },
  {
    id: "frankincense",
    name: "프랑킨센스",
    keywords: ["스트레스완화", "마음안정", "명상", "차분함", "밤추천"],
    description: "프랑킨센스는 깊은 호흡을 유도하고 마음을 안정시켜주는 묵직한 향입니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/frankincense-oil",
    image: "/images/frankincense.png"
  }
];

export type Oil = typeof oilRecommendations[0];
