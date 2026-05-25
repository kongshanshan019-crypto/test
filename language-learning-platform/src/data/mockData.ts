import { Course, Achievement } from '../types';

export const mockCourses: Course[] = [
  {
    id: 'en-beginner-1',
    language: 'english',
    level: 'beginner',
    title: '英语入门：基础会话',
    description: '从零开始学习英语，掌握基础词汇和日常会话能力',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=English%20language%20learning%20books%20and%20conversation%20bubbles%2C%20modern%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 20,
    duration: '10小时',
    enrolledCount: 12580,
    rating: 4.8
  },
  {
    id: 'en-elementary-1',
    language: 'english',
    level: 'elementary',
    title: '英语进阶：职场沟通',
    description: '学习职场英语，提升商务沟通和邮件写作能力',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20English%20meeting%20and%20email%20communication%2C%20professional%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 25,
    duration: '15小时',
    enrolledCount: 8920,
    rating: 4.7
  },
  {
    id: 'en-intermediate-1',
    language: 'english',
    level: 'intermediate',
    title: '英语中级：流利表达',
    description: '提升英语流利度，掌握复杂语法和高级表达',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20English%20conversation%20and%20fluency%2C%20dynamic%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 30,
    duration: '20小时',
    enrolledCount: 6540,
    rating: 4.9
  },
  {
    id: 'ja-beginner-1',
    language: 'japanese',
    level: 'beginner',
    title: '日语入门：五十音与基础',
    description: '学习日语五十音图，掌握基础词汇和简单句型',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20hiragana%20katakana%20and%20cherry%20blossoms%2C%20traditional%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 18,
    duration: '12小时',
    enrolledCount: 9870,
    rating: 4.8
  },
  {
    id: 'ja-elementary-1',
    language: 'japanese',
    level: 'elementary',
    title: '日语进阶：日常会话',
    description: '学习日常会话表达，了解日本文化礼仪',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20daily%20conversation%20and%20culture%2C%20modern%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 22,
    duration: '16小时',
    enrolledCount: 7230,
    rating: 4.7
  },
  {
    id: 'ko-beginner-1',
    language: 'korean',
    level: 'beginner',
    title: '韩语入门：韩字与发音',
    description: '学习韩文字母，掌握基础发音规则',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Korean%20hangul%20alphabet%20and%20traditional%20patterns%2C%20modern%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 16,
    duration: '10小时',
    enrolledCount: 8450,
    rating: 4.6
  },
  {
    id: 'ko-elementary-1',
    language: 'korean',
    level: 'elementary',
    title: '韩语进阶：韩剧口语',
    description: '学习韩剧常用表达，了解韩国流行文化',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Korean%20drama%20and%20kpop%20culture%2C%20vibrant%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 20,
    duration: '14小时',
    enrolledCount: 6890,
    rating: 4.8
  },
  {
    id: 'fr-beginner-1',
    language: 'french',
    level: 'beginner',
    title: '法语入门：浪漫之旅',
    description: '学习法语基础，感受法国浪漫文化',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=French%20Eiffel%20Tower%20and%20romantic%20atmosphere%2C%20elegant%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 18,
    duration: '11小时',
    enrolledCount: 5620,
    rating: 4.7
  },
  {
    id: 'de-beginner-1',
    language: 'german',
    level: 'beginner',
    title: '德语入门：严谨之美',
    description: '学习德语基础，了解德国文化与生活',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=German%20Brandenburg%20Gate%20and%20precision%20engineering%2C%20modern%20illustration&image_size=landscape_4_3',
    lessons: [],
    totalLessons: 20,
    duration: '13小时',
    enrolledCount: 4280,
    rating: 4.6
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: '初学者',
    description: '完成第一节课',
    icon: '🎯',
    requirement: { type: 'lessons', value: 1 },
    points: 10,
    unlocked: false
  },
  {
    id: 'ten-lessons',
    title: '学习达人',
    description: '完成10节课程',
    icon: '📚',
    requirement: { type: 'lessons', value: 10 },
    points: 50,
    unlocked: false
  },
  {
    id: 'seven-day-streak',
    title: '坚持不懈',
    description: '连续学习7天',
    icon: '🔥',
    requirement: { type: 'streak', value: 7 },
    points: 100,
    unlocked: false
  },
  {
    id: 'hundred-vocabulary',
    title: '词汇大师',
    description: '学习100个单词',
    icon: '📖',
    requirement: { type: 'vocabulary', value: 100 },
    points: 80,
    unlocked: false
  },
  {
    id: 'perfect-score',
    title: '满分王',
    description: '获得10次满分',
    icon: '⭐',
    requirement: { type: 'score', value: 10 },
    points: 120,
    unlocked: false
  },
  {
    id: 'study-time',
    title: '时间投入',
    description: '累计学习10小时',
    icon: '⏰',
    requirement: { type: 'time', value: 600 },
    points: 60,
    unlocked: false
  }
];

export const vocabularyData = {
  english: {
    beginner: [
      { word: 'hello', pronunciation: '/həˈloʊ/', translation: '你好', example: 'Hello, how are you?' },
      { word: 'goodbye', pronunciation: '/ɡʊdˈbaɪ/', translation: '再见', example: 'Goodbye, see you tomorrow!' },
      { word: 'thank you', pronunciation: '/θæŋk juː/', translation: '谢谢', example: 'Thank you for your help.' },
      { word: 'please', pronunciation: '/pliːz/', translation: '请', example: 'Please sit down.' },
      { word: 'sorry', pronunciation: '/ˈsɒri/', translation: '对不起', example: 'Sorry, I am late.' },
      { word: 'yes', pronunciation: '/jes/', translation: '是', example: 'Yes, I agree.' },
      { word: 'no', pronunciation: '/noʊ/', translation: '不', example: 'No, thank you.' },
      { word: 'water', pronunciation: '/ˈwɔːtər/', translation: '水', example: 'Can I have some water?' },
      { word: 'food', pronunciation: '/fuːd/', translation: '食物', example: 'The food is delicious.' },
      { word: 'friend', pronunciation: '/frend/', translation: '朋友', example: 'She is my best friend.' }
    ]
  },
  japanese: {
    beginner: [
      { word: 'こんにちは', pronunciation: 'konnichiwa', translation: '你好', example: 'こんにちは、元気ですか？' },
      { word: 'さようなら', pronunciation: 'sayounara', translation: '再见', example: 'さようなら、また明日！' },
      { word: 'ありがとう', pronunciation: 'arigatou', translation: '谢谢', example: 'ありがとうございます。' },
      { word: 'すみません', pronunciation: 'sumimasen', translation: '对不起', example: 'すみません、遅れました。' },
      { word: 'はい', pronunciation: 'hai', translation: '是', example: 'はい、そうです。' },
      { word: 'いいえ', pronunciation: 'iie', translation: '不', example: 'いいえ、違います。' },
      { word: '水', pronunciation: 'mizu', translation: '水', example: '水をください。' },
      { word: '食べ物', pronunciation: 'tabemono', translation: '食物', example: 'この食べ物は美味しいです。' },
      { word: '友達', pronunciation: 'tomodachi', translation: '朋友', example: '彼は私の友達です。' },
      { word: '先生', pronunciation: 'sensei', translation: '老师', example: '田中先生は日本語の先生です。' }
    ]
  },
  korean: {
    beginner: [
      { word: '안녕하세요', pronunciation: 'annyeonghaseyo', translation: '你好', example: '안녕하세요, 만나서 반갑습니다.' },
      { word: '안녕히 가세요', pronunciation: 'annyeonghi gaseyo', translation: '再见', example: '안녕히 가세요, 내일 봐요!' },
      { word: '감사합니다', pronunciation: 'gamsahamnida', translation: '谢谢', example: '도와주셔서 감사합니다.' },
      { word: '미안합니다', pronunciation: 'mianhamnida', translation: '对不起', example: '미안합니다, 늦었어요.' },
      { word: '네', pronunciation: 'ne', translation: '是', example: '네, 맞아요.' },
      { word: '아니요', pronunciation: 'aniyo', translation: '不', example: '아니요, 괜찮아요.' },
      { word: '물', pronunciation: 'mul', translation: '水', example: '물 주세요.' },
      { word: '음식', pronunciation: 'eumsik', translation: '食物', example: '이 음식은 맛있어요.' },
      { word: '친구', pronunciation: 'chingu', translation: '朋友', example: '그는 제 친구예요.' },
      { word: '선생님', pronunciation: 'seonsaengnim', translation: '老师', example: '김 선생님은 한국어 선생님이에요.' }
    ]
  }
};

export const grammarData = {
  english: {
    beginner: [
      {
        rule: 'Subject + Verb + Object',
        explanation: '英语基本句型：主语 + 谓语 + 宾语',
        examples: [
          'I eat an apple.',
          'She reads a book.',
          'They play football.'
        ],
        exercises: [
          {
            question: '选择正确的句子：',
            options: ['He play soccer.', 'He plays soccer.', 'He playing soccer.'],
            correctAnswer: 1,
            explanation: '第三人称单数主语，动词需要加s'
          }
        ]
      }
    ]
  }
};

export const speakingData = {
  english: {
    beginner: [
      { text: 'Hello, my name is John.', translation: '你好，我叫约翰。', difficulty: 'easy' },
      { text: 'Nice to meet you.', translation: '很高兴认识你。', difficulty: 'easy' },
      { text: 'How are you today?', translation: '你今天好吗？', difficulty: 'easy' },
      { text: 'I am learning English.', translation: '我正在学习英语。', difficulty: 'medium' },
      { text: 'Can you help me, please?', translation: '你能帮我吗？', difficulty: 'medium' }
    ]
  }
};

export const listeningData = {
  english: {
    beginner: [
      {
        transcript: 'Hello, I am Sarah. I am from Canada. I like to read books and listen to music.',
        translation: '你好，我是莎拉。我来自加拿大。我喜欢读书和听音乐。',
        questions: [
          {
            question: 'Sarah来自哪里？',
            options: ['美国', '加拿大', '英国', '澳大利亚'],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
};
