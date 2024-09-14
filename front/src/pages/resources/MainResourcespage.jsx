import React from "react";
import Sidebar from "../../component/Sidebar";
import { Search } from 'lucide-react';
import EducationCardsSlider from "./EducationCardsSlider";

const subjects = [
  { name: 'Math', img: "https://cf.quizizz.com/image/subject-math.png" },
  { name: 'English', img: 'https://cf.quizizz.com/image/subject-english.png' },
  { name: 'Social Studies', img: 'https://cf.quizizz.com/image/subject-social.png' },
  { name: 'Languages', img: 'https://cf.quizizz.com/image/subject-language.png' },
  { name: 'Science', img: 'https://cf.quizizz.com/image/subject-science.png' },
  { name: 'Computers', img: 'https://cf.quizizz.com/image/subject-computers.png' },
  { name: 'Career Ed', img: 'https://cf.quizizz.com/image/subject-career.png' },
  { name: 'Creative Arts', img: 'https://cf.quizizz.com/image/subject-arts.png' },
  { name: 'Health & PE', img: 'https://cf.quizizz.com/image/subject-health.png' },
];

const SubjectButton = ({ name, img }) => (
  <button className="flex flex-col items-center space-y-2">
    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-xl overflow-hidden">
      <img src={img} alt={name} className="w-full h-full object-cover" />
    </div>
    <span className="text-xs text-center">{name}</span>
  </button>
);

function MainResourcesPage() {
  return (
    <div className="grid grid-cols-[auto,1fr] h-screen bg-[#F2F2F2]">
      <div className="w-16 bg-white shadow-md">
        <Sidebar />
      </div>
      
      <div className="overflow-y-auto p-10 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center p-10">What will you teach today?</h1>
        
        <div className="max-w-3xl mx-auto mb-8 ">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for activities on any topic"
              className="w-full p-3 pr-10 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-[60px]"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-1 mb-8 mt-20 w-[70%] mx-auto">
          {subjects.map((subject) => (
            <SubjectButton key={subject.name} name={subject.name} img={subject.img} />
          ))}
        </div>
        
        <div className="mt-8">
          <EducationCardsSlider />
        </div>
      </div>
    </div>
  );
}

export default MainResourcesPage;