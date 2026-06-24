import { oilRecommendations } from './src/lib/oils';

const emotions_list = ['짜증', '슬픔', '피곤함', '긴장', '분노', '불면', '두통', ''];
const scents_list = ['과일향', '꽃향', '나무향', '허브향', '시원함', '상큼한 향', '달달한 향'];
const physicals_list = ['불면증', '두통', '스트레스', '감정진정', '피곤함', '우울증', '근육통', '뾰루지', '벌레물림', '식욕부진', '입냄새', '입덧'];

const mandarinCombos = [];

for (const e of emotions_list) {
  for (const s of scents_list) {
    for (const p of physicals_list) {
      const userKeywords = [e, s, p].filter(Boolean);
      
      const emotions = userKeywords.filter(k => 
        ['짜증', '슬픔', '긴장', '분노', '스트레스', '감정진정', '우울증'].includes(k)
      );
      const physicals = userKeywords.filter(k => 
        ['피곤함', '불면', '불면증', '두통', '근육통', '뾰루지', '벌레물림', '식욕부진', '입냄새', '입덧'].includes(k)
      );
      const scents = userKeywords.filter(k => 
        ['과일향', '꽃향', '나무향', '허브향', '시원함', '상큼한 향', '달달한 향'].includes(k)
      );
      const scentPreference = scents[0] || '';

      const scoredOils = [...oilRecommendations].map(oil => {
        let emotionScore = 0;
        for (const emotion of emotions) {
          if (oil.recommendations.includes(emotion)) emotionScore++;
        }

        let physicalScore = 0;
        for (const physical of physicals) {
          if (oil.recommendations.includes(physical)) physicalScore++;
          else if (physical === '불면' && oil.recommendations.includes('불면증')) physicalScore++;
          else if (physical === '불면증' && oil.recommendations.includes('불면')) physicalScore++;
        }

        let scentScore = oil.scent === scentPreference ? 1 : 0;
        if (scentPreference === '과일향' && ['lemon', 'lime', 'orange'].includes(oil.id)) {
          scentScore = 1;
        }

        const frequencyScore = oil.frequency === '낮음' ? 3 : oil.frequency === '중간' ? 2 : 1;

        return { oil, emotionScore, physicalScore, scentScore, frequencyScore };
      });

      scoredOils.sort((a, b) => {
        if (b.emotionScore !== a.emotionScore) return b.emotionScore - a.emotionScore;
        if (b.physicalScore !== a.physicalScore) return b.physicalScore - a.physicalScore;
        if (b.scentScore !== a.scentScore) return b.scentScore - a.scentScore;
        return b.frequencyScore - a.frequencyScore;
      });

      if (scoredOils[0].oil.name === '만다린') {
        mandarinCombos.push(`감정: ${e || '선택안함'}, 향: ${s}, 문제: ${p}`);
      }
    }
  }
}

console.log(`만다린 추천 횟수: ${mandarinCombos.length}회`);
console.log(mandarinCombos.slice(0, 10).join('\n'));
if (mandarinCombos.length > 10) console.log('...등등');
