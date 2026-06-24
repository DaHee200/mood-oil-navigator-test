'use server';

import { oilRecommendations, type Oil } from '@/lib/oils';
import { ai } from '@/ai/genkit';

export interface RecommendationData {
  oil: Oil;
  recommendationText: string;
}

interface ActionResult {
  success: boolean;
  data?: RecommendationData;
  error?: string;
}

export async function getOilRecommendation(userKeywords: string[]): Promise<ActionResult> {
  try {
    const emotions = userKeywords.filter(k => 
      ['짜증', '슬픔', '긴장', '분노', '스트레스', '감정진정', '우울증'].includes(k)
    );
    const physicals = userKeywords.filter(k => 
      ['피곤함', '불면', '불면증', '두통', '근육통', '뾰루지', '벌레물림', '식욕부진', '입냄새', '입덧'].includes(k)
    );
    const scents = userKeywords.filter(k => 
      ['과일향', '꽃향', '나무향', '허브향', '시원함'].includes(k)
    );
    const scentPreference = scents[0] || '';

    // Calculate match scores for all 11 oils
    const scoredOils = [...oilRecommendations].map(oil => {
      let emotionScore = 0;
      for (const emotion of emotions) {
        if (oil.recommendations.includes(emotion)) {
          emotionScore++;
        }
      }

      let physicalScore = 0;
      for (const physical of physicals) {
        if (oil.recommendations.includes(physical)) {
          physicalScore++;
        } else if (physical === '불면' && oil.recommendations.includes('불면증')) {
          physicalScore++;
        } else if (physical === '불면증' && oil.recommendations.includes('불면')) {
          physicalScore++;
        }
      }

      let scentScore = oil.scent === scentPreference ? 1 : 0;
      if (scentPreference === '과일향' && ['lemon', 'lime', 'orange'].includes(oil.id)) {
        scentScore = 1;
      }

      // Frequency score: '낮음' is 3 (highest priority), '중간' is 2, '높음' is 1
      const frequencyScore = oil.frequency === '낮음' ? 3 : oil.frequency === '중간' ? 2 : 1;

      return {
        oil,
        emotionScore,
        physicalScore,
        scentScore,
        frequencyScore
      };
    });

    // Sort according to rules:
    // 1. Emotion score descending (감정 상태를 가장 우선적으로 고려)
    // 2. Physical score descending
    // 3. Scent score descending (동일 점수일 경우 향 취향 우선 반영)
    // 4. Frequency score descending (낮음 -> 중간 -> 높음 순으로 우선순위 부여)
    scoredOils.sort((a, b) => {
      if (b.emotionScore !== a.emotionScore) {
        return b.emotionScore - a.emotionScore;
      }
      if (b.physicalScore !== a.physicalScore) {
        return b.physicalScore - a.physicalScore;
      }
      if (b.scentScore !== a.scentScore) {
        return b.scentScore - a.scentScore;
      }
      return b.frequencyScore - a.frequencyScore;
    });

    const bestMatch = scoredOils[0].oil;

    // Generate comforting recommendation copy via Genkit
    const prompt = `
당신은 아로마테라피 전문가이자 따뜻하고 위로를 건네는 카운셀러입니다.
사용자가 선택한 오일과 그들의 상태를 기반으로 맞춤형 아로마테라피 추천 메시지를 작성해 주세요.

# 분석 대상 오일
- 이름: ${bestMatch.name}
- 향: ${bestMatch.scent}
- 추천 증상: ${bestMatch.recommendations.join(', ')}

# 사용자의 선택 항목
- 선택한 감정/상태: ${emotions.join(', ') || '없음'}
- 선택한 신체 고민: ${physicals.join(', ') || '없음'}
- 선호하는 향: ${scentPreference || '없음'}

# 규칙:
1. 의학적 치료 효과를 단정하지 마세요. (예: "치료됩니다", "두통이 낫습니다", "우울증을 완치합니다" 대신 "완화에 도움이 될 수 있습니다", "도움을 줍니다", "가라앉히는 데 도움을 줍니다" 등 완곡하고 안전한 표현 사용)
2. 따뜻하고 위로하는 말투(해요체, 공감형 어조, "~길 바라요", "~해 드릴게요")를 사용하세요.
3. 사용자가 선호하는 향과 추천된 오일의 향이 다를 경우, '✨ 이 향을 추천한 이유' 섹션에서 "고객님은 [선호하는 향]을 선호하시지만, 지금의 [감정/신체 상태]를 더 잘 보듬어 드리기 위해 오늘은 특별히 [추천 오일의 향]을 품은 이 오일을 추천해 드려요"와 같이 다정하게 그 이유를 설명해 주세요. 만약 향이 같다면(선호 향이 '과일향'이고 레몬, 라임, 오렌지, 자몽, 베르가못, 만다린 등 과일 계열 오일이 추천된 경우 포함) 취향에 잘 맞는 향이라고 언급해 주세요. 단, 선호하는 향이 '없음'인 경우 향 취향에 대한 언급(예: '선호하는 향이 없으시지만', '향에 상관없이' 등)은 완전히 빼고, 오직 사용자의 감정/신체 상태 해결에 초점을 맞춰 이유를 설명해 주세요.
4. 반드시 아래 출력 형식을 완벽히 지켜서 출력하세요. 추가적인 마크다운 서식이나 서론/결론은 생략하고 오직 형식에 지정된 내용만 반환해야 합니다.

# 출력 형식:
오늘의 향기

🌿 추천 오일
${bestMatch.name}

💭 지금의 당신에게
(사용자의 현재 감정과 상태를 따뜻하게 공감하고 위로하는 2~3문장)

✨ 이 향을 추천한 이유
(사용자가 입력한 감정, 신체 상태, 향 취향을 기반으로 이 오일이 왜 적합한지 설명하는 2~3문장)

🌸 향의 느낌
(이 오일 향의 특징을 감성적이고 묘사적으로 작성한 2~3문장)

🌱 작은 사용 팁
(디퓨저, 손수건, 명상 등 실생활에서 활용할 수 있는 간단한 팁 1개)

향은 문제를 해결해주지는 않지만, 오늘의 당신을 조금 더 다정하게 안아줄 수 있어요.
`;

    let recommendationText = '';
    try {
      const response = await ai.generate({
        prompt,
      });
      recommendationText = response.text || '';
    } catch (apiError) {
      console.warn('Genkit API call failed, generating local fallback text:', apiError);
      
      const emotionText = emotions.length > 0 ? emotions.join(', ') : '오늘의 기분';
      const physicalText = physicals.length > 0 ? physicals.join(', ') : '신체 고민';
      
      const scentFeelText = bestMatch.scent === '꽃향' ? '화사하고 부드러운 꽃향기가 마치 만개한 정원 한가운데 서 있는 듯한 포근함을 선사합니다.' :
                            bestMatch.scent === '과일향' ? '갓 딴 과일처럼 상큼하고 달콤한 향이 기분을 단숨에 밝고 경쾌하게 끌어올려 줍니다.' :
                            bestMatch.scent === '나무향' ? '비 온 뒤의 깊은 숲속처럼 차분하고 묵직한 나무향이 마음의 중심을 단단하게 잡아줍니다.' :
                            bestMatch.scent === '시원함' ? '가슴속까지 탁 트이는 시원하고 청량한 향이 복잡한 머리를 맑게 비워줍니다.' :
                            bestMatch.scent === '상큼한 향' ? '기분까지 깨우는 짜릿하고 상큼한 향이 무거운 몸과 마음을 가볍게 리프레시 해줍니다.' :
                            bestMatch.scent === '달달한 향' ? '마치 솜사탕처럼 부드럽고 달달한 향기가 지친 감정을 포근하게 감싸 안아줍니다.' :
                            '싱그럽고 자연스러운 허브향이 지친 마음에 상쾌한 휴식처가 되어 줍니다.';
      let reasonText = '';
      if (!scentPreference) {
        reasonText = `선택하신 ${emotionText} 상태 및 ${physicalText} 고민을 다정하게 보듬어 드리기 위해 오늘은 특별히 ${bestMatch.name} 오일을 준비했습니다.`;
      } else {
        const isFruitFamily = scentPreference === '과일향' && ['lemon', 'lime', 'orange', 'grapefruit', 'bergamot', 'mandarin'].includes(bestMatch.id);
        if (scentPreference !== bestMatch.scent && !isFruitFamily) {
          reasonText = `고객님은 ${scentPreference}을(를) 선호하시지만, 선택하신 ${emotionText} 상태 및 ${physicalText} 고민을 더 잘 보듬어 드리기 위해 오늘은 특별히 ${bestMatch.scent}을 품은 ${bestMatch.name} 오일을 준비했습니다.`;
        } else {
          reasonText = `선호하시는 ${scentPreference} 취향에 꼭 맞추어, 선택하신 ${emotionText} 상태 및 ${physicalText} 고민에 도움을 드리고자 ${bestMatch.name} 오일을 준비했습니다.`;
        }
      }
      
      recommendationText = `
오늘의 향기

🌿 추천 오일
${bestMatch.name}

💭 지금의 당신에게
오늘 하루 참 수고 많으셨어요. 마음에 내려앉은 피로와 무거운 짐을 잠시 내려놓고, 온전히 자신만을 위한 쉼의 시간을 가질 수 있기를 바랄게요.

✨ 이 향을 추천한 이유
${reasonText}

🌸 향의 느낌
${bestMatch.name}은(는) ${scentFeelText}

🌱 작은 사용 팁
따뜻한 물을 담은 컵에 오일 1~2방울을 떨어뜨려 공기 중에 퍼지는 향을 들이마시거나, 잠들기 전 베개 모퉁이에 한 방울 묻혀보세요.

향은 문제를 해결해주지는 않지만, 오늘의 당신을 조금 더 다정하게 안아줄 수 있어요.
`;
    }

    return {
      success: true,
      data: {
        oil: bestMatch,
        recommendationText,
      }
    };

  } catch (error) {
    console.error('Error getting oil recommendation:', error);
    return { success: false, error: '추천을 받는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.' };
  }
}
