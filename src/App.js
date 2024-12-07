import React, { useState, useEffect, useRef } from 'react';
import { ref, get } from 'firebase/database';
import database from './firebaseConfig';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Search, Heart, Phone, Home, User, Award, Bird, Loader, PhoneCall } from 'lucide-react';
import parrotImage from './images/parrot.jpeg';
import './styles.css';

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="relative">
        <Bird className="w-20 h-20 text-white animate-bounce" />
        <div className="absolute top-0 left-0 w-20 h-20 animate-ping">
          <Bird className="w-20 h-20 text-white/30" />
        </div>
      </div>
      <h2 className="text-white text-3xl mt-4 font-bold animate-pulse">טוען...</h2>
    </div>
  </div>
);

const DetailCard = ({ icon: Icon, label, value, delay }) => (
  <div
    className="opacity-0 animate-slide-in-right"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border-r-4 border-blue-500">
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-blue-100 p-3 rounded-xl">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-blue-900">{label}</h3>
      </div>
      {label === "טלפון" ? (
        <a href={`tel:${value}`} className="flex items-center gap-2 text-xl text-blue-700 hover:text-blue-900 transition-all duration-300">
          <PhoneCall className="w-6 h-6" />
          {value}
        </a>
      ) : (
        <p className={`text-xl text-gray-700 pr-14 text-right`}>
          {value}
        </p>
      )}
    </div>
  </div>
);


function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [parrotCode, setParrotCode] = useState('');
  const [parrotInfo, setParrotInfo] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const resultsRef = useRef(null); // Reference to the results section

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    setParrotInfo(null);
    setIsInitialLoading(true);
    const parrotRef = ref(database, `parrots/${parrotCode.toLocaleLowerCase()}`);
    const snapshot = await get(parrotRef);
    if (snapshot.exists()) {
      setParrotInfo(snapshot.val());
      // Scroll to the results section only if results are available
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Slight delay to ensure results are in the DOM
    } else {
      setParrotInfo(null);
      alert('תוכי לא נמצא');
    }
    setIsInitialLoading(false);
    setIsSearching(false); // Stop loading animation
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            מצאת תוכי אבוד?
          </h1>

          <div className="relative inline-block mb-8">
            <div className="absolute -bottom-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-full animate-float shadow-lg z-10">
              <Heart className="w-8 h-8 text-white z-10" />
            </div>
            <div className="absolute inset-0 bg-blue-500 rounded-3xl animate-pulse opacity-20"></div>
            <img
              src={parrotImage}
              alt="Lost Parrot"
              className="rounded-3xl w-full md:w-96 h-96 object-cover mx-auto shadow-2xl border-4 border-white relative transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          <p className="text-lg md:text-xl text-blue-800 mb-8 max-w-2xl mx-auto leading-relaxed">
            יש לי טבעת! תזינו את הקוד ותחזירו אותי לבעלים, אני מתגעגעת וכך גם הם.
          </p>
        </div>

        {/* Search Section */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl mb-12 transform hover:shadow-3xl transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex flex-col gap-4">
              <label className="text-lg md:text-xl font-medium text-blue-900">
                הזן את קוד הטבעת של התוכי:
              </label>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={parrotCode}
                  onChange={(e) => setParrotCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="הקלד את הקוד כאן..."
                  className="flex-1 p-6 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-right text-lg md:text-xl transition-all duration-300"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className={`
                    bg-gradient-to-l from-blue-500 to-purple-600 
                    hover:from-blue-600 hover:to-purple-700 
                    text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-lg flex items-center justify-center 
                    transition-all duration-300 transform hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isSearching ? (
                    <Loader className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-6 h-6 ml-2" />
                      <span>חפש</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div ref={resultsRef} className="space-y-4 mb-12">
          {parrotInfo && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-3">
                  <Award className="w-10 h-10 text-blue-600 animate-pulse" />
                  מצאנו את התוכי!
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailCard icon={User} label="שם התוכי" value={parrotInfo.name} delay={100} />
                <DetailCard icon={Home} label="כתובת" value={parrotInfo.address} delay={200} />
                <DetailCard icon={Phone} label="טלפון" value={parrotInfo.phone} delay={300} />
                <DetailCard icon={User} label="שם הבעלים" value={parrotInfo.ownerName} delay={300} />
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <p>רוצים גם להכניס את התוכי שלכם למאגר?</p>
        <p>זמיר (לא בשבת)</p>
        <a href={`tel:${`53-220-9008`}`} className="flex items-center gap-2 text-xl text-blue-700 hover:text-blue-900 transition-all duration-300">
          <PhoneCall className="w-6 h-6" />
          {`053-220-9008`}
        </a>
      </div> 
    </div>
  );
}

export default App;
