export const oilRecommendations = [
  {
    id: "orange",
    name: "오렌지",
    keywords: ["행복", "상쾌함", "기분전환", "활기찬", "아침"],
    description: "오렌지는 상큼한 향기로 기분을 좋게 만들고, 행복감을 북돋아 줍니다.",
    purchaseLink: "https://www.doterra.com/KR/ko_KR/p/wild-orange-oil",
    image: "/images/orange.jpg"
  },
  {
    id: "lavender",
    name: "라벤더",
    keywords: ["불안", "긴장완화", "숙면", "차분함", "밤"],
    description: "라벤더는 긴장을 완화하고 불안을 가라앉히며, 차분한 상태로 이끌어 줍니다.",
    purchaseLink: "https://www.doterra.com/KR/ko_KR/p/lavender-oil",
    image: "/images/lavender.jpg"
  },
  {
    id: "peppermint",
    name: "페퍼민트",
    keywords: ["피로", "에너지부족", "활력", "두통완화", "상쾌함", "아침"],
    description: "페퍼민트는 정신을 맑게 해주고, 피곤함을 덜어주는 활력 오일입니다.",
    purchaseLink: "https://www.doterra.com/KR/ko_KR/p/peppermint-oil",
    image: "/images/peppermint.jpg"
  },
  {
    id: "ylang-ylang",
    name: "일랑일랑",
    keywords: ["우울", "위로", "감정완화", "부드러움", "밤", "안정"],
    description: "일랑일랑은 감정을 부드럽게 어루만지며, 우울한 기분을 완화시켜 줍니다.",
    purchaseLink: "https://www.doterra.com/KR/ko_KR/p/ylang-ylang-oil",
    image: "/images/ylangylang.jpg"
  },
  {
    id: "bergamot",
    name: "베르가못",
    keywords: ["짜증", "감정진정", "밸런스", "여유", "스트레스", "안정"],
    description: "베르가못은 짜증을 가라앉히고 마음의 여유를 되찾게 도와줍니다.",
    purchaseLink: "https://www.doterra.com/KR/ko_KR/p/bergamot-oil",
    image: "/images/bergamot.jpg"
  },
  {
    id: "frankincense",
    name: "프랑킨센스",
    keywords: ["스트레스", "마음안정", "깊은호흡", "명상", "집중", "나무", "밤"],
    description: "프랑킨센스는 깊은 호흡을 유도하고 마음을 안정시켜주는 묵직한 향입니다.",
    purchaseLink: "https://www.doterra.com/KR/ko_KR/p/frankincense-oil",
    image: "/images/frankincense.jpg"
  }
];

export type Oil = typeof oilRecommendations[0];
