import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaPlay, 
  FaCheck, 
  FaArrowLeft, 
  FaArrowRight,
  FaCode,
  FaVideo,
  FaQuestionCircle,
  FaStar
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Lesson = () => {
  const { courseId, lessonId } = useParams();
  const { user, updateProgress, addCertification } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const lesson = {
    id: lessonId,
    title: lessonId === 'quiz' ? 'Final Assessment' : `Lesson ${lessonId}: ${lessonId === '1' ? 'Introduction to Programming' : lessonId === '2' ? 'Variables and Data Types' : 'Control Structures'}`,
    type: lessonId === 'quiz' ? 'quiz' : 'interactive',
    content: [
      {
        type: 'text',
        title: 'Welcome to the Lesson',
        content: `In this lesson, you'll learn the fundamental concepts of programming. Programming is the process of creating a set of instructions that tell a computer how to perform a task.`
      },
      {
        type: 'code',
        title: 'Your First Program',
        content: `console.log("Hello, World!");`,
        language: 'javascript',
        explanation: 'This simple program outputs "Hello, World!" to the console.'
      },
      {
        type: 'video',
        title: 'Understanding Variables',
        content: 'https://example.com/video.mp4',
        description: 'Watch this video to understand how variables work in programming.'
      }
    ],
    quiz: lessonId === 'quiz' ? [
      {
        id: 1,
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Markup Language'
        ],
        correct: 0
      },
      {
        id: 2,
        question: 'Which symbol is used for single-line comments in JavaScript?',
        options: [
          '//',
          '/*',
          '#',
          '--'
        ],
        correct: 0
      },
      {
        id: 3,
        question: 'What will console.log(typeof null) output?',
        options: [
          'null',
          'undefined',
          'object',
          'number'
        ],
        correct: 2
      },
      {
        id: 4,
        question: 'Which method is used to add an element to the end of an array?',
        options: [
          'push()',
          'pop()',
          'shift()',
          'unshift()'
        ],
        correct: 0
      }
    ] : []
  };

  const course = {
    id: courseId,
    title: courseId === 'javascript-fundamentals' ? 'JavaScript Fundamentals' : 'Python for Beginners',
    lessons: [
      { id: '1', title: 'Introduction', completed: true },
      { id: '2', title: 'Variables', completed: true },
      { id: '3', title: 'Control Structures', completed: lessonId === '3' },
      { id: '4', title: 'Functions', completed: false },
      { id: 'quiz', title: 'Final Quiz', completed: false }
    ]
  };

  const currentLessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  const nextLesson = course.lessons[currentLessonIndex + 1];
  const prevLesson = course.lessons[currentLessonIndex - 1];

  useEffect(() => {
    if (user && lessonId !== 'quiz') {
      updateProgress(courseId, lessonId, false);
    }
  }, [user, courseId, lessonId, updateProgress]);

  const handleNext = () => {
    if (currentStep < lesson.content.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (lesson.type === 'quiz') {
      handleQuizSubmit();
    } else {
      handleCompleteLesson();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteLesson = () => {
    if (user) {
      updateProgress(courseId, lessonId, true);
      toast.success('Lesson completed!');
      
      if (nextLesson) {
        setTimeout(() => {
          navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
        }, 1000);
      }
    }
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleQuizSubmit = () => {
    const score = calculateQuizScore();
    setShowQuizResults(true);
    
    if (user) {
      updateProgress(courseId, lessonId, true, score);
      
      if (score >= 75) {
        setTimeout(() => {
          setShowCertificate(true);
          addCertification({
            id: `cert-${courseId}-${Date.now()}`,
            courseId: courseId,
            courseName: course.title,
            date: new Date().toISOString(),
            score: score
          });
        }, 2000);
      }
    }
  };

  const calculateQuizScore = () => {
    const totalQuestions = lesson.quiz.length;
    const correctAnswers = lesson.quiz.filter(q => quizAnswers[q.id] === q.correct).length;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const renderContent = (content) => {
    switch (content.type) {
      case 'text':
        return (
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">{content.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{content.content}</p>
          </div>
        );
      
      case 'code':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{content.title}</h2>
            <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
              <pre className="text-emerald-400 text-sm overflow-x-auto">
                <code>{content.content}</code>
              </pre>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-emerald-900">
              <h3 className="text-lg font-semibold text-white mb-2">Explanation</h3>
              <p className="text-gray-300">{content.explanation}</p>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{content.title}</h2>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FaVideo className="text-4xl text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400">Video: {content.description}</p>
                  <button className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg transition-colors">
                    <FaPlay className="inline mr-2" />
                    Play Video
                  </button>
                </div>
              </div>
            </div>
            <p className="text-gray-400">{content.description}</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderQuiz = () => {
    if (showQuizResults) {
      const score = calculateQuizScore();
      return (
        <div className="text-center py-8">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
            score >= 75 ? 'bg-emerald-500' : 'bg-red-500'
          }`}>
            <span className="text-white text-2xl font-bold">{score}%</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {score >= 75 ? 'Congratulations! 🎉' : 'Try Again'}
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            {score >= 75 
              ? `You passed the quiz with a score of ${score}%!`
              : `You scored ${score}%. You need 75% to pass.`
            }
          </p>
          <div className="flex gap-4 justify-center">
            {score >= 75 ? (
              <button
                onClick={() => setShowCertificate(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Certificate
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowQuizResults(false);
                  setQuizAnswers({});
                  setCurrentStep(0);
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Retry Quiz
              </button>
            )}
            <Link
              to={`/course/${courseId}`}
              className="border border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Course
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white mb-8">Final Assessment</h2>
        {lesson.quiz.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FaQuestionCircle className="text-emerald-400 mr-3" />
              Question {index + 1}: {question.question}
            </h3>
            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={quizAnswers[question.id] === optionIndex}
                    onChange={() => handleQuizAnswer(question.id, optionIndex)}
                    className="text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          </motion.div>
        ))}
        
        <div className="flex justify-between items-center pt-6">
          <div className="text-gray-400">
            {Object.keys(quizAnswers).length} of {lesson.quiz.length} questions answered
          </div>
          <button
            onClick={handleQuizSubmit}
            disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Submit Answers
          </button>
        </div>
      </div>
    );
  };

const renderCertificate = () => (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 print:bg-white print:p-0 print:inset-auto print:fixed">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white shadow-xl rounded-lg border-4 border-yellow-500 p-6 max-w-md w-full print:shadow-none print:border-none text-center font-serif"
    >
      <h1 className="text-xl font-bold text-gray-800 mb-1 tracking-wide">
        Certificate of Completion
      </h1>
      <p className="text-sm text-gray-600 mb-4 italic">This is to certify that</p>

      <h2 className="text-lg font-bold text-emerald-700 border-b border-gray-300 inline-block px-4 py-1 mb-2">
        {user?.name}
      </h2>

      <p className="text-sm text-gray-700 mt-2 mb-3">
        has successfully completed the course
      </p>

      <h3 className="text-base font-bold text-gray-800 mb-4">{course.title}</h3>

      <div className="flex justify-between text-xs text-gray-600 mt-4 mb-2 px-2">
        <div className="text-center">
          <div className="font-semibold uppercase tracking-wide">Date</div>
          <div>{new Date().toLocaleDateString()}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold uppercase tracking-wide">Score</div>
          <div>{calculateQuizScore()}%</div>
        </div>
      </div>

      <div className="flex justify-between items-end mt-6 px-2">
        <div className="text-center">
          <div className="w-24 h-px bg-gray-500 mb-1 mx-auto"></div>
          <div className="text-xs text-gray-600">Signature</div>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-yellow-500 rounded-full mx-auto mb-1"></div>
          <div className="text-xs text-gray-600">Seal</div>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-6 print:hidden">
        <button
          onClick={() => setShowCertificate(false)}
          className="bg-white hover:bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm border transition-colors"
        >
          Close
        </button>
        <button
          onClick={() => window.print()}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md text-sm transition-colors"
        >
          Print
        </button>
      </div>
    </motion.div>
  </div>
);


  if (lesson.type === 'quiz') {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              to={`/course/${courseId}`}
              className="flex items-center text-emerald-400 hover:text-emerald-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to Course
            </Link>
            <div className="text-gray-400">
              Lesson {currentLessonIndex + 1} of {course.lessons.length}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-emerald-900">
            {renderQuiz()}
          </div>
        </div>

        <AnimatePresence>
          {showCertificate && renderCertificate()}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            to={`/course/${courseId}`}
            className="flex items-center text-emerald-400 hover:text-emerald-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Course
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="text-gray-400">
              Step {currentStep + 1} of {lesson.content.length}
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / lesson.content.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Course Content</h3>
              <div className="space-y-2">
                {course.lessons.map((lessonItem, index) => (
                  <div
                    key={lessonItem.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      lessonItem.id === lessonId
                        ? 'bg-emerald-600 text-white'
                        : lessonItem.completed
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                    onClick={() => navigate(`/course/${courseId}/lesson/${lessonItem.id}`)}
                  >
                    <div className="flex items-center space-x-3">
                      {lessonItem.completed ? (
                        <FaCheck className="text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                      )}
                      <span className="text-sm">
                        {index + 1}. {lessonItem.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl p-8 border border-emerald-900">
              <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
              
              {lesson.type !== 'quiz' && (
                <div className="mb-8">
                  {renderContent(lesson.content[currentStep])}
                </div>
              )}

              <div className="flex justify-between items-center pt-8 border-t border-gray-700">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center text-emerald-400 hover:text-emerald-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
                >
                  {currentStep === lesson.content.length - 1 && lesson.type !== 'quiz'
                    ? 'Complete Lesson'
                    : 'Next Step'}
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>

            {currentStep === lesson.content.length - 1 && lesson.type !== 'quiz' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-900 bg-opacity-20 border border-emerald-800 rounded-xl p-6 mt-6"
              >
                <div className="text-center">
                  <FaCheck className="text-emerald-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Lesson Complete!</h3>
                  <p className="text-emerald-200 mb-4">
                    You've completed all the steps in this lesson.
                  </p>
                  <button
                    onClick={handleCompleteLesson}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Mark as Completed
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCertificate && renderCertificate()}
      </AnimatePresence>
    </div>
  );
};

export default Lesson;