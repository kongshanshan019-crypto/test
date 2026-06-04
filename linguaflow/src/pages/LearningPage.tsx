import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home
} from 'lucide-react';
import { Card } from '../components/common';
import { useCourseStore, useLearningStore, useUserStore, useProgressStore } from '../stores';

export default function LearningPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { courses } = useCourseStore();
  const { currentLesson, learningMode, currentWordIndex, recordAnswer, completeLesson, resetSession, nextWord, prevWord } = useLearningStore();
  const { addExp } = useUserStore();
  const { completeLesson: completeProgressLesson } = useProgressStore();

  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (lesson) {
      useLearningStore.setState({
        currentLesson: lesson,
        learningMode: lesson.type,
        currentWordIndex: 0,
        sessionCorrect: 0,
        sessionTotal: 0,
        sessionXpEarned: 0
      });
    }
  }, [lesson]);

  if (!lesson || !currentLesson) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-2">课程不存在</h2>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            返回课程中心
          </button>
        </div>
      </div>
    );
  }

  const words = currentLesson.content.words || [];
  const currentWord = words[currentWordIndex];
  const isLastWord = currentWordIndex === words.length - 1;
  const isFirstWord = currentWordIndex === 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    recordAnswer(correct);
    setLastAnswer(correct);
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setLastAnswer(null);
      if (isLastWord) {
        handleComplete();
      } else {
        nextWord();
        setIsFlipped(false);
      }
    }, 1000);
  };

  const handleComplete = () => {
    const result = completeLesson();
    addExp(result.xp);
    completeProgressLesson();
    setSessionComplete(true);
  };

  const handleRestart = () => {
    resetSession();
    setIsFlipped(false);
    setShowResult(false);
    setLastAnswer(null);
    setSessionComplete(false);
    if (lesson) {
      useLearningStore.setState({
        currentLesson: lesson,
        learningMode: lesson.type,
        currentWordIndex: 0,
        sessionCorrect: 0,
        sessionTotal: 0,
        sessionXpEarned: 0
      });
    }
  };

  const renderVocabularyMode = () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-text-secondary">
            {currentWordIndex + 1} / {words.length}
          </span>
          <div className="flex-1 h-2 bg-surface-light rounded-full mx-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
            />
          </div>
          <span className="text-secondary font-medium">+{currentWord?.mastery || 0}%</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <Card
            className="p-12 cursor-pointer transition-all duration-300"
            hover
            onClick={handleFlip}
          >
            <div className="text-center">
              <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {!isFlipped ? (
                  <div>
                    <h2 className="text-5xl font-bold text-text-primary mb-4">
                      {currentWord?.text}
                    </h2>
                    <p className="text-text-secondary text-lg">点击查看释义</p>
                  </div>
                ) : (
                  <div style={{ transform: 'rotateY(180deg)' }}>
                    <p className="text-3xl text-primary font-bold mb-4">
                      {currentWord?.translation}
                    </p>
                    <p className="text-text-secondary text-lg mb-4">
                      {currentWord?.pronunciation}
                    </p>
                    <div className="mt-6 p-4 bg-surface-light rounded-xl">
                      <p className="text-text-primary italic">
                        "{currentWord?.example}"
                      </p>
                      <p className="text-text-secondary text-sm mt-2">
                        {currentWord?.exampleTranslation}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => {
            handleAnswer(false);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-surface-light text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
        >
          <XCircle className="w-5 h-5" />
          不认识
        </button>
        <button
          onClick={() => {
            const utterance = new SpeechSynthesisUtterance(currentWord?.text || '');
            utterance.lang = course?.language === 'ja' ? 'ja-JP' : course?.language === 'ko' ? 'ko-KR' : 'en-US';
            speechSynthesis.speak(utterance);
          }}
          className="p-3 bg-surface-light rounded-xl hover:bg-primary/20 transition-colors"
        >
          <Volume2 className="w-6 h-6 text-primary" />
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="flex items-center gap-2 px-6 py-3 bg-secondary/20 text-secondary rounded-xl font-medium hover:bg-secondary/30 transition-colors"
        >
          <CheckCircle className="w-5 h-5" />
          认识
        </button>
      </div>
    </div>
  );

  const renderSessionComplete = () => {
    const result = completeLesson();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center"
      >
        <Card className="p-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">太棒了！</h2>
          <p className="text-text-secondary mb-8">你完成了本次学习</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <p className="text-3xl font-bold text-primary">{result.correct}</p>
              <p className="text-xs text-text-secondary">正确</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary">{result.total}</p>
              <p className="text-xs text-text-secondary">总数</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">+{result.xp}</p>
              <p className="text-xs text-text-secondary">经验值</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-surface-light text-text-primary rounded-xl font-medium hover:bg-primary/20 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              再学一遍
            </button>
            <button
              onClick={() => {
                resetSession();
                navigate('/courses');
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
            >
              <Home className="w-5 h-5" />
              返回课程
            </button>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <button
          onClick={() => {
            resetSession();
            navigate(`/courses/${courseId}`);
          }}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          退出学习
        </button>
      </div>

      {sessionComplete ? (
        renderSessionComplete()
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">{lesson.title}</h1>
            <p className="text-text-secondary">
              {learningMode === 'vocabulary' && '单词记忆'}
              {learningMode === 'grammar' && '语法练习'}
              {learningMode === 'speaking' && '口语跟读'}
              {learningMode === 'listening' && '听力训练'}
            </p>
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`fixed top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl font-medium ${
                  lastAnswer
                    ? 'bg-secondary/20 text-secondary'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {lastAnswer ? '正确！' : '再想想'}
              </motion.div>
            )}
          </AnimatePresence>

          {learningMode === 'vocabulary' && renderVocabularyMode()}
        </>
      )}
    </div>
  );
}
