export interface Oil {
  id: string;
  name: string;
  scent: string;
  recommendations: string[];
  frequency: '낮음' | '중간' | '높음';
  description: string;
  buyLink: string;
  image: string;
}

export const oilRecommendations: Oil[] = [
  {
    id: "lemon",
    name: "레몬",
    scent: "상큼한 향",
    recommendations: ["피곤함", "스트레스", "두통", "식욕부진"],
    frequency: "높음",
    description: "레몬은 싱그럽고 상큼한 과일향으로 피로와 스트레스를 해소하고 두통 완화에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/lemon-oil",
    image: "/images/lemon.png"
  },
  {
    id: "peppermint",
    name: "페퍼민트",
    scent: "시원함",
    recommendations: ["두통", "피곤함", "긴장", "근육통", "스트레스"],
    frequency: "높음",
    description: "페퍼민트는 상쾌한 허브향으로 두통과 피로를 해소하고 긴장과 근육통 완화에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/peppermint-oil",
    image: "/images/peppermint.png"
  },
  {
    id: "copaiba",
    name: "코파이바",
    scent: "나무향",
    recommendations: ["짜증", "분노", "긴장", "스트레스", "감정진정", "불면"],
    frequency: "낮음",
    description: "코파이바는 깊고 은은한 나무향으로 짜증과 분노를 가라앉히고 긴장과 스트레스를 진정시키며 불면 완화에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/copaiba-oil",
    image: "/images/copaiba.png"
  },
  {
    id: "rosemary",
    name: "로즈마리",
    scent: "허브향",
    recommendations: ["피곤함", "두통", "무기력"],
    frequency: "중간",
    description: "로즈마리는 맑고 깨끗한 허브향으로 피로와 무기력을 날려버리고 두통 완화에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/rosemary-oil",
    image: "/images/rosemary.png"
  },
  {
    id: "orange",
    name: "오렌지",
    scent: "달달한 향",
    recommendations: ["슬픔", "짜증", "우울증", "스트레스", "불면"],
    frequency: "높음",
    description: "오렌지는 달콤하고 싱그러운 과일향으로 슬픔과 짜증을 덜어주며 스트레스와 불면 해소에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/wild-orange-oil",
    image: "/images/orange.png"
  },
  {
    id: "rose",
    name: "로즈",
    scent: "꽃향",
    recommendations: ["슬픔", "우울증", "감정진정", "불면", "스트레스"],
    frequency: "낮음",
    description: "로즈는 화사하고 풍성한 꽃향으로 슬픈 기분을 달래고 감정을 진정시키며 스트레스와 불면 완화에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/rose-touch-oil",
    image: "/images/rose.png"
  },
  {
    id: "myrrh",
    name: "미르",
    scent: "나무향",
    recommendations: ["긴장", "감정진정", "불면", "스트레스", "입냄새"],
    frequency: "낮음",
    description: "미르는 묵직하고 신비로운 나무향으로 긴장된 마음을 진정시키고 깊은 불면과 스트레스 완화에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/myrrh-oil",
    image: "/images/myrrh.png"
  },
  {
    id: "cedarwood",
    name: "시더우드",
    scent: "나무향",
    recommendations: ["불면", "긴장", "감정진정", "스트레스", "짜증"],
    frequency: "중간",
    description: "시더우드는 포근하고 숲속 같은 나무향으로 짜증과 스트레스를 완화하고 불면과 긴장 해소에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/cedarwood-oil",
    image: "/images/cedarwood.png"
  },
  {
    id: "lavender",
    name: "라벤더",
    scent: "꽃향",
    recommendations: ["불면증", "두통", "스트레스", "감정진정", "긴장", "분노", "짜증", "벌레물림"],
    frequency: "높음",
    description: "라벤더는 편안한 꽃향으로 불면증과 두통을 완화하고, 스트레스와 긴장된 분노, 짜증을 가라앉히는 데 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/lavender-oil",
    image: "/images/lavender.png"
  },
  {
    id: "eucalyptus",
    name: "유칼립투스",
    scent: "허브향",
    recommendations: ["두통", "피곤함", "근육통"],
    frequency: "중간",
    description: "유칼립투스는 맑고 화한 허브향으로 머리를 맑게 하여 두통과 피로를 해소하고 근육통 완화에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/eucalyptus-oil",
    image: "/images/eucalyptus.png"
  },
  {
    id: "ylang-ylang",
    name: "일랑일랑",
    scent: "꽃향",
    recommendations: ["슬픔", "짜증", "분노", "긴장", "스트레스", "감정진정", "불면", "우울증"],
    frequency: "중간",
    description: "일랑일랑은 이국적이고 매혹적인 꽃향으로 우울함과 슬픔, 분노, 짜증을 녹이고 깊은 쉼과 감정진정에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/ylang-ylang-oil",
    image: "/images/ylangylang.png"
  },
  {
    id: "lime",
    name: "라임",
    scent: "상큼한 향",
    recommendations: ["짜증", "피곤함", "스트레스", "두통"],
    frequency: "중간",
    description: "라임은 톡 쏘는 생기발랄한 과일향으로 짜증과 피로를 시원하게 날려주고 스트레스와 두통 완화에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/lime-oil",
    image: "/images/lime.png"
  },
  {
    id: "bergamot",
    name: "베르가못",
    scent: "과일향",
    recommendations: ["짜증", "슬픔", "긴장", "불면", "불면증", "스트레스", "감정진정", "우울증", "두통"],
    frequency: "중간",
    description: "베르가못은 쌉싸름하고 우아한 과일향으로 짜증과 슬픔을 어루만져주며 스트레스 완화와 감정 진정에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/bergamot-oil",
    image: "/images/bergamot.png"
  },
  {
    id: "grapefruit",
    name: "자몽",
    scent: "과일향",
    recommendations: ["슬픔", "피곤함", "스트레스", "우울증"],
    frequency: "높음",
    description: "자몽은 톡톡 튀는 쌉쌀하고 달콤한 과일향으로 슬픔과 피로를 덜어주고 우울감과 스트레스 해소에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/grapefruit-oil",
    image: "/images/grapefruit.png"
  },
  {
    id: "mandarin",
    name: "만다린",
    scent: "과일향",
    recommendations: ["슬픔", "긴장", "불면", "불면증", "스트레스", "감정진정", "우울증", "입덧"],
    frequency: "중간",
    description: "만다린은 부드럽고 따뜻한 과일향으로 긴장과 슬픔을 녹여주며 편안한 숙면과 우울감 진정에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/green-mandarin-oil",
    image: "/images/mandarin.png"
  },
  {
    id: "marjoram",
    name: "마조람",
    scent: "허브향",
    recommendations: ["긴장", "분노", "불면", "불면증", "스트레스", "감정진정", "두통", "근육통"],
    frequency: "낮음",
    description: "마조람은 따뜻하고 부드러운 허브향으로 분노와 긴장을 풀어주고 뭉친 근육통 완화와 깊은 불면 해소에 도움을 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/marjoram-oil",
    image: "/images/marjoram.png"
  },
  {
    id: "jasmine",
    name: "자스민",
    scent: "달달한 향",
    recommendations: ["슬픔", "짜증", "감정진정", "우울증", "스트레스"],
    frequency: "낮음",
    description: "자스민은 우아하고 매혹적인 꽃향으로 깊은 슬픔과 우울증을 달래고 지친 감정을 포근하게 진정시켜 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/jasmine-touch-oil",
    image: "/images/jasmine.png"
  },
  {
    id: "teatree",
    name: "티트리",
    scent: "허브향",
    recommendations: ["뾰루지"],
    frequency: "중간",
    description: "티트리는 시원하고 청량한 허브향으로 뾰루지 등 피부 트러블을 진정시키고 답답한 마음을 상쾌하게 정화해 줍니다.",
    buyLink: "https://www.doterra.com/KR/ko_KR/p/tea-tree-oil",
    image: "/images/teatree.png"
  }
];
