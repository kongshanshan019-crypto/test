import type { User, Course, Achievement, CommunityPost, StudyGroup } from '../types';

export const mockUser: User = {
  id: 'user-001',
  email: 'learner@linguaflow.com',
  nickname: '语言探险家',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=learner',
  targetLanguage: 'en',
  level: 5,
  exp: 2450,
  streak: 12,
  joinedAt: new Date('2024-01-15')
};

export const mockCourses: Course[] = [
  {
    id: 'course-en-001',
    language: 'en',
    level: 2,
    title: 'English Basic A2',
    description: '日常英语入门，掌握生活常用表达',
    coverImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80',
    duration: 480,
    enrolledCount: 12580,
    lessons: [
      {
        id: 'lesson-en-001',
        title: 'Greetings & Introductions',
        type: 'vocabulary',
        content: {
          words: [
            { id: 'w1', text: 'Hello', translation: '你好', pronunciation: '/həˈloʊ/', example: 'Hello, how are you?', exampleTranslation: '你好，你好吗？', mastery: 80 },
            { id: 'w2', text: 'Good morning', translation: '早上好', pronunciation: '/ɡʊd ˈmɔːrnɪŋ/', example: 'Good morning everyone!', exampleTranslation: '大家早上好！', mastery: 70 },
            { id: 'w3', text: 'Nice to meet you', translation: '很高兴认识你', pronunciation: '/naɪs tuː miːt juː/', example: 'Nice to meet you, I am Lisa.', exampleTranslation: '很高兴认识你，我是丽莎。', mastery: 60 },
            { id: 'w4', text: 'How are you?', translation: '你好吗？', pronunciation: '/haʊ ɑːr juː/', example: 'How are you doing today?', exampleTranslation: '你今天好吗？', mastery: 90 },
            { id: 'w5', text: 'Thank you', translation: '谢谢', pronunciation: '/θæŋk juː/', example: 'Thank you for your help.', exampleTranslation: '谢谢你的帮助。', mastery: 95 },
          ]
        },
        completed: true,
        expReward: 50
      },
      {
        id: 'lesson-en-002',
        title: 'Daily Conversations',
        type: 'grammar',
        content: {
          grammar: {
            id: 'g1',
            title: 'Present Simple Tense',
            explanation: '一般现在时用于描述习惯性动作、事实和真理。',
            examples: [
              { text: 'I drink coffee every morning.', translation: '我每天早上喝咖啡。' },
              { text: 'She works at a bank.', translation: '她在银行工作。' }
            ],
            exercises: [
              {
                id: 'e1',
                type: 'fill_blank',
                question: 'He ___ English every day. (study)',
                correctAnswer: 'studies',
                explanation: '以s, sh, ch, x, o结尾的动词加es'
              },
              {
                id: 'e2',
                type: 'correct',
                question: 'She don\'t like apples.',
                options: ["She doesn't like apples.", "She don't likes apples."],
                correctAnswer: "She doesn't like apples.",
                explanation: '第三人称单数使用doesn\'t'
              }
            ]
          }
        },
        completed: false,
        expReward: 60
      },
      {
        id: 'lesson-en-003',
        title: 'At the Restaurant',
        type: 'speaking',
        content: {
          speaking: {
            prompt: 'Order food at a restaurant',
            promptTranslation: '在餐厅点餐',
            referenceText: 'Hello, I would like to order the grilled salmon, please.',
            referenceAudio: ''
          }
        },
        completed: false,
        expReward: 70
      },
      {
        id: 'lesson-en-004',
        title: 'Listening Practice',
        type: 'listening',
        content: {
          listening: {
            audioText: 'The train departs at 3 PM from platform 5.',
            options: [
              { text: '3 PM, Platform 5', isCorrect: true },
              { text: '5 PM, Platform 3', isCorrect: false },
              { text: '3 AM, Platform 5', isCorrect: false }
            ],
            dictationText: 'The train departs at 3 PM from platform 5.'
          }
        },
        completed: false,
        expReward: 55
      }
    ]
  },
  {
    id: 'course-ja-001',
    language: 'ja',
    level: 1,
    title: 'Japanese Hiragana',
    description: '从零开始学习日语平假名',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    duration: 360,
    enrolledCount: 8920,
    lessons: [
      {
        id: 'lesson-ja-001',
        title: 'Vowels',
        type: 'vocabulary',
        content: {
          words: [
            { id: 'jw1', text: 'あ', translation: 'a', pronunciation: 'ah', example: 'あめ (ame) = rain', exampleTranslation: '雨', mastery: 50 },
            { id: 'jw2', text: 'い', translation: 'i', pronunciation: 'ee', example: 'いぬ (inu) = dog', exampleTranslation: '犬', mastery: 40 },
            { id: 'jw3', text: 'う', translation: 'u', pronunciation: 'oo', example: 'うみ (umi) = sea', exampleTranslation: '海', mastery: 30 },
          ]
        },
        completed: false,
        expReward: 40
      },
      {
        id: 'lesson-ja-002',
        title: 'Basic Grammar',
        type: 'grammar',
        content: {
          grammar: {
            id: 'jg1',
            title: 'は as topic marker',
            explanation: 'は用于标记句子的话题，即使它写作"wa"也读作"ha"。',
            examples: [
              { text: '私は学生です。', translation: 'I am a student.' },
              { text: '彼は先生です。', translation: 'He is a teacher.' }
            ],
            exercises: [
              {
                id: 'je1',
                type: 'fill_blank',
                question: '私___学生です。',
                correctAnswer: 'は',
                explanation: 'は用作话题标记'
              }
            ]
          }
        },
        completed: false,
        expReward: 50
      }
    ]
  },
  {
    id: 'course-ko-001',
    language: 'ko',
    level: 1,
    title: 'Korean Hangul',
    description: '学习韩文字母Hangul基础',
    coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    duration: 300,
    enrolledCount: 6540,
    lessons: [
      {
        id: 'lesson-ko-001',
        title: 'Basic Vowels',
        type: 'vocabulary',
        content: {
          words: [
            { id: 'kw1', text: 'ㅏ', translation: 'a', pronunciation: 'ah', example: '아버지 (abeoji) = father', exampleTranslation: '父亲', mastery: 20 },
            { id: 'kw2', text: 'ㅓ', translation: 'eo', pronunciation: 'uh', example: '어머니 (eomeoni) = mother', exampleTranslation: '母亲', mastery: 15 },
          ]
        },
        completed: false,
        expReward: 35
      }
    ]
  },
  {
    id: 'course-en-002',
    language: 'en',
    level: 3,
    title: 'English Intermediate B1',
    description: '提升英语能力，掌握更复杂的表达',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    duration: 600,
    enrolledCount: 15820,
    lessons: []
  },
  {
    id: 'course-en-003',
    language: 'en',
    level: 4,
    title: 'English Advanced C1',
    description: '流利英语，商务与学术场景',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    duration: 720,
    enrolledCount: 8920,
    lessons: []
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-001',
    title: '初次入门',
    description: '完成第一课学习',
    icon: 'Star',
    type: 'course',
    requirement: 1,
    rewardExp: 100
  },
  {
    id: 'ach-002',
    title: '连续7天',
    description: '保持7天连续学习',
    icon: 'Flame',
    type: 'streak',
    requirement: 7,
    rewardExp: 200
  },
  {
    id: 'ach-003',
    title: '词汇达人',
    description: '掌握100个单词',
    icon: 'BookOpen',
    type: 'course',
    requirement: 100,
    rewardExp: 300
  },
  {
    id: 'ach-004',
    title: '等级5',
    description: '达到等级5',
    icon: 'Award',
    type: 'level',
    requirement: 5,
    rewardExp: 500
  },
  {
    id: 'ach-005',
    title: '口语新星',
    description: '完成10次口语练习',
    icon: 'Mic',
    type: 'special',
    requirement: 10,
    rewardExp: 250
  },
  {
    id: 'ach-006',
    title: '听力专家',
    description: '完成20次听力训练',
    icon: 'Headphones',
    type: 'special',
    requirement: 20,
    rewardExp: 300
  },
  {
    id: 'ach-007',
    title: '月度学习者',
    description: '连续学习30天',
    icon: 'Calendar',
    type: 'streak',
    requirement: 30,
    rewardExp: 1000
  },
  {
    id: 'ach-008',
    title: '三语达人',
    description: '开始学习第三种语言',
    icon: 'Globe',
    type: 'special',
    requirement: 3,
    rewardExp: 800
  }
];

export const mockPosts: CommunityPost[] = [
  {
    id: 'post-001',
    authorId: 'user-002',
    authorName: '英语爱好者',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    content: '今天学习了5个新单词！感觉进步很大。大家有什么记单词的好方法吗？',
    likes: 42,
    comments: 8,
    createdAt: new Date('2024-03-15'),
    language: 'en'
  },
  {
    id: 'post-002',
    authorId: 'user-003',
    authorName: '日语学习者',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
    content: '终于把五十音图背下来了！下一步开始学习简单会话。',
    likes: 89,
    comments: 15,
    createdAt: new Date('2024-03-14'),
    language: 'ja'
  },
  {
    id: 'post-003',
    authorId: 'user-004',
    authorName: '韩语迷',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
    content: '推荐一个韩语学习小组，大家一起互相监督学习！',
    likes: 156,
    comments: 32,
    createdAt: new Date('2024-03-13'),
    language: 'ko'
  }
];

export const mockGroups: StudyGroup[] = [
  {
    id: 'group-001',
    name: 'English Daily Chat',
    description: '每日英语口语练习小组',
    memberCount: 128,
    language: 'en',
    coverImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80'
  },
  {
    id: 'group-002',
    name: '日本語の会話',
    description: '日语会话练习小组',
    memberCount: 86,
    language: 'ja',
    coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80'
  },
  {
    id: 'group-003',
    name: '한국어 스터디',
    description: '韩语学习互助小组',
    memberCount: 64,
    language: 'ko',
    coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80'
  }
];

export const languageNames: Record<string, string> = {
  en: '英语',
  ja: '日语',
  ko: '韩语'
};

export const levelNames: Record<number, string> = {
  1: '初级',
  2: '入门',
  3: '中级',
  4: '高级',
  5: '流利'
};
