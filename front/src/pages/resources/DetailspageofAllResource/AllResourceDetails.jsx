import React, { useState } from 'react';
import { Book, MessageSquare, FileText, Video, Share2, Plus, MoreHorizontal } from 'lucide-react';

const NavButton = ({ icon: Icon, text, isActive }) => (
  <button className={`flex items-center px-4 py-2 rounded-md text-sm ${isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}>
    <Icon size={18} className="mr-2" />
    {text}
  </button>
);

const QuizCard = ({ image, title, questions, grade, isPremium }) => (
  <div className="flex items-start p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
    <img src={image} alt={title} className="w-20 h-20 object-cover rounded-lg mr-4 shadow" />
    <div>
      <div className="flex items-center">
        <Book size={16} className="text-teal-500 mr-2" />
        <span className="font-semibold text-lg">{title}</span>
        {isPremium && <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-medium">PREMIUM</span>}
      </div>
      <div className="text-sm text-gray-600 mt-1">
        <span>{questions} Questions</span>
        <span className="mx-2">•</span>
        <span>{grade}</span>
      </div>
    </div>
  </div>
);

const QuizAnswer = ({ text, isCorrect }) => (
  <div className={`flex items-center mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
    <div className={`w-4 h-4 rounded-full ${isCorrect ? 'bg-green-600' : 'bg-red-600'} mr-2`}></div>
    <span className="text-sm">{text}</span>
  </div>
);

const QuizPlatform = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="flex space-x-2 mb-6 overflow-x-auto bg-white p-2 rounded-lg shadow">
        {['All', 'Quizzes', 'Lessons', 'Passages', 'Interactive videos'].map((tab) => (
          <NavButton 
            key={tab} 
            icon={tab === 'Quizzes' ? Book : tab === 'Lessons' ? MessageSquare : tab === 'Passages' ? FileText : tab === 'Interactive videos' ? Video : Book} 
            text={tab} 
            isActive={activeTab === tab} 
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      <div className="text-2xl font-bold mb-6 text-gray-800">2.7K Results</div>

      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-3/5 bg-white rounded-lg shadow-md overflow-hidden">
          <QuizCard image="/api/placeholder/100/100" title="Physics" questions={10} grade="1st - 2nd Grade" />
          <QuizCard image="/api/placeholder/100/100" title="Physics" questions={10} grade="7th - 10th Grade" />
          <QuizCard image="/api/placeholder/100/100" title="Physics Vector Quiz" questions={10} grade="11th Grade" isPremium />
          <QuizCard image="/api/placeholder/100/100" title="physics" questions={19} grade="4th Grade" />
        </div>

        <div className="w-full lg:w-2/5 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Physics</h2>
            <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <Share2 size={24} />
            </button>
          </div>
          <div className="text-sm text-gray-600 mb-6">by Ankita Jain | India</div>
          <div className="flex flex-wrap gap-2 mb-6">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200">Play</button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-100 transition-colors duration-200">
              <Book size={18} className="mr-2" /> Save quiz
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-100 transition-colors duration-200">
              <MessageSquare size={18} className="mr-2" /> AI Enhance
            </button>
            <button className="border border-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-700">10 Questions</span>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600">Show Answers</span>
              <button 
                className={`w-12 h-6 rounded-full ${showAnswers ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-200 ease-in-out relative`}
                onClick={() => setShowAnswers(!showAnswers)}
              >
                <span className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${showAnswers ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-2 text-gray-800">Multiple Choice</h3>
            <p className="text-gray-700 mb-2">Forces can be:</p>
            {showAnswers && (
              <>
                <QuizAnswer text="Pushes only" isCorrect={false} />
                <QuizAnswer text="Pulls only" isCorrect={false} />
                <QuizAnswer text="Pushes and pulls" isCorrect={true} />
                <QuizAnswer text="None of the above" isCorrect={false} />
              </>
            )}
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="font-semibold mb-2 text-gray-800">Multiple Choice</h3>
            <p className="text-gray-700 mb-2">Unit of force is:</p>
            {showAnswers && (
              <>
                <QuizAnswer text="Newton" isCorrect={true} />
                <QuizAnswer text="Meter" isCorrect={false} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlatform;