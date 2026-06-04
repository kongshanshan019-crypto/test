import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  CheckCircle,
  XCircle,
  Trophy,
  Mic,
  Square
} from 'lucide-react';
import { Card } from '../components/common';
import { useLearningStore, useCourseStore, useUserStore } from '../stores';

export default function LearningPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { currentLesson, learningMode, currentWordIndex, sessionCorrect, sessionTotal, startLesson, nextWord, prevWord, recordAnswer, completeLesson, resetSession } = useLearningStore();
  const { courses } = useCourseStore();
  const { addExp } = useUserStore();

  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (lesson) {
      startLesson(lesson, lesson.type);
    }
    return () => {
      resetSession();
    };
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <p className="text-text-secondary">加载中...</p>
      </div>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    setShowResult(false);
    setSelectedAnswer(null);
    if (learningMode === 'vocabulary' && currentLesson?.content.words) {
      if (currentWordIndex < currentLesson.content.words.length - 1) {
        nextWord();
      }
    } else if (learningMode === 'grammar' && currentLesson?.content.grammar) {
      const exercises = currentLesson.content.grammar.exercises;
      if (exerciseIndex < exercises.length - 1) {
        setExerciseIndex(exerciseIndex + 1);
      }
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowResult(false);
    setSelectedAnswer(null);
    if (learningMode === 'vocabulary') {
      prevWord();
    } else if (learningMode === 'grammar') {
      setExerciseIndex(Math.max(0, exerciseIndex - 1));
    }
  };

  const handleAnswer = (correct: boolean) => {
    recordAnswer(correct);
    setShowResult(true);
    if (correct) {
      addExp(10);
    }
  };

  const handleComplete = () => {
    const result = completeLesson();
    addExp(result.xp);
    navigate(`/courses/${courseId}`);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = course?.language === 'ja' ? 'ja-JP' : course?.language === 'ko' ? 'ko-KR' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setShowResult(true);
      }, 3000);
    }
  };

  const currentWord = learningMode === 'vocabulary' && currentLesson?.content.words
    ? currentLesson.content.words[currentWordIndex]
    : null;

  const currentExercise = learningMode === 'grammar' && currentLesson?.content.grammar
    ? currentLesson.content.grammar.exercises[exerciseIndex]
    : null;

  const renderVocabulary = () => (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
        >
          <Card className="p-8 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div className="min-h-[200px] flex flex-col items-center justify-center">
              {!isFlipped ? (
                <>
                  <h2 className="text-4xl font-bold text-text-primary mb-4">{currentWord?.text}</h2>
                  <p className="text-text-secondary mb-4">{currentWord?.pronunciation}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(currentWord?.text || '');
                    }}
                    className="p-3 rounded-full bg-surface-light hover:bg-primary/20 transition-colors"
                  >
                    <Volume2 className="w-6 h-6 text-primary" />
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-text-primary mb-4">{currentWord?.translation}</h2>
                  <p className="text-text-secondary mb-4 text-center">{currentWord?.example}</p>
                  <p className="text-xs text-text-secondary text-center">{currentWord?.exampleTranslation}</p>
                </>
              )}
            </div>
            <p className="text-center text-sm text-text-secondary mt-4">
              点击卡片 {isFlipped ? '查看单词' : '查看释义'}
            </p>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentWordIndex === 0}
          className="p-3 rounded-xl bg-surface-light text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-text-secondary">
          {currentWordIndex + 1} / {currentLesson?.content.words?.length || 0}
        </span>
        <button
          onClick={handleNext}
          disabled={currentWordIndex === (currentLesson?.content.words?.length || 0) - 1}
          className="p-3 rounded-xl bg-surface-light text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => handleAnswer(false)}
          className="px-6 py-3 rounded-xl bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30 transition-colors"
        >
          <XCircle className="w-5 h-5 inline mr-2" />
          不认识
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="px-6 py-3 rounded-xl bg-secondary/20 text-secondary font-medium hover:bg-secondary/30 transition-colors"
        >
          <CheckCircle className="w-5 h-5 inline mr-2" />
          认识
        </button>
      </div>
    </div>
  );

  const renderGrammar = () => (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-6">
          <span className="px-3 py-1 rounded-lg bg-surface-light text-sm text-text-secondary">
            语法练习 {exerciseIndex + 1} / {currentLesson?.content.grammar?.exercises.length || 0}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-text-primary mb-6">{currentExercise?.question}</h3>

        {currentExercise?.options ? (
          <div className="space-y-3">
            {currentExercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!showResult) {
                    setSelectedAnswer(option);
                    handleAnswer(option === currentExercise.correctAnswer);
                  }
                }}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  showResult
                    ? option === currentExercise.correctAnswer
                      ? 'border-secondary bg-secondary/20 text-secondary'
                      : option === selectedAnswer
                      ? 'border-red-500 bg-red-500/20 text-red-400'
                      : 'border-surface-light text-text-secondary'
                    : selectedAnswer === option
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-surface-light text-text-primary hover:border-primary/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={selectedAnswer || ''}
              onChange={(e) => !showResult && setSelectedAnswer(e.target.value)}
              placeholder="输入你的答案..."
              className="w-full p-4 bg-surface-light rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={showResult}
            />
            {!showResult && (
              <button
                onClick={() => handleAnswer(selectedAnswer === currentExercise?.correctAnswer)}
                className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
              >
                提交答案
              </button>
            )}
          </div>
        )}

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl ${
              selectedAnswer === currentExercise?.correctAnswer
                ? 'bg-secondary/20 text-secondary'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            <p className="font-medium mb-2">
              {selectedAnswer === currentExercise?.correctAnswer ? '回答正确！' : '回答错误'}
            </p>
            <p className="text-sm opacity-80">{currentExercise?.explanation}</p>
          </motion.div>
        )}
      </Card>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={exerciseIndex === 0}
          className="px-4 py-2 rounded-xl bg-surface-light text-text-secondary hover:text-text-primary disabled:opacity-50 transition-colors"
        >
          上一题
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-xl bg-surface-light text-text-secondary hover:text-text-primary transition-colors"
        >
          下一题
        </button>
      </div>
    </div>
  );

  const renderSpeaking = () => (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-lg bg-surface-light text-sm text-text-secondary">
            口语练习
          </span>
        </div>

        <h3 className="text-xl font-bold text-text-primary text-center mb-2">
          {lesson.content.speaking?.prompt}
        </h3>
        <p className="text-text-secondary text-center mb-8">
          {lesson.content.speaking?.promptTranslation}
        </p>

        <div className="bg-surface-light rounded-xl p-6 mb-6">
          <p className="text-sm text-text-secondary mb-2">参考发音:</p>
          <p className="text-lg text-text-primary">{lesson.content.speaking?.referenceText}</p>
          <button
            onClick={() => speakText(lesson.content.speaking?.referenceText || '')}
            className="mt-4 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            <Volume2 className="w-5 h-5 inline mr-2" />
            播放
          </button>
        </div>

        <div className="flex flex-col items-center">
          <motion.button
            onClick={toggleRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-red-500 animate-pulse'
                : 'bg-primary hover:bg-primary-dark'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isRecording ? (
              <Square className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </motion.button>
          <p className="text-text-secondary mt-4">
            {isRecording ? '录音中...' : '点击开始录音'}
          </p>
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-secondary/20 text-secondary text-center"
          >
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">完成！获得 +50 经验值</p>
          </motion.div>
        )}
      </Card>

      <button
        onClick={handleComplete}
        className="mt-8 px-8 py-3 bg-secondary text-white rounded-xl font-medium hover:bg-secondary-dark transition-colors"
      >
        完成课程
      </button>
    </div>
  );

  const renderListening = () => (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-lg bg-surface-light text-sm text-text-secondary">
            听力训练
          </span>
        </div>

        <div className="flex flex-col items-center mb-8">
          <motion.button
            onClick={() => speakText(lesson.content.listening?.audioText || '')}
            className="w-20 h-20 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Volume2 className="w-8 h-8 text-white" />
          </motion.button>
          <p className="text-text-secondary mt-4">点击播放音频</p>
        </div>

        {lesson.content.listening?.options && (
          <div className="space-y-3">
            {lesson.content.listening.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!showResult) {
                    setSelectedAnswer(option.text);
                    handleAnswer(option.isCorrect);
                  }
                }}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  showResult
                    ? option.isCorrect
                      ? 'border-secondary bg-secondary/20 text-secondary'
                      : option.text === selectedAnswer
                      ? 'border-red-500 bg-red-500/20 text-red-400'
                      : 'border-surface-light text-text-secondary'
                    : 'border-surface-light text-text-primary hover:border-primary/50'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-secondary/20 text-secondary text-center"
          >
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">回答正确！获得 +{lesson.expReward} 经验值</p>
          </motion.div>
        )}
      </Card>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="px-6 py-3 rounded-xl bg-surface-light text-text-secondary hover:text-text-primary transition-colors"
        >
          返回课程
        </button>
        <button
          onClick={handleComplete}
          className="px-6 py-3 bg-secondary text-white rounded-xl font-medium hover:bg-secondary-dark transition-colors"
        >
          完成课程
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回课程
          </button>
          <div className="flex items-center gap-4">
            <span className="text-text-secondary">
              正确: <span className="text-secondary font-bold">{sessionCorrect}</span>
            </span>
            <span className="text-text-secondary">
              总计: <span className="text-text-primary font-bold">{sessionTotal}</span>
            </span>
          </div>
        </div>

        <motion.div
          key={learningMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {learningMode === 'vocabulary' && renderVocabulary()}
          {learningMode === 'grammar' && renderGrammar()}
          {learningMode === 'speaking' && renderSpeaking()}
          {learningMode === 'listening' && renderListening()}
        </motion.div>
      </div>
    </div>
  );
}
