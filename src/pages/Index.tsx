
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon, Heart, Languages } from "lucide-react";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [userType, setUserType] = useState<'child' | 'caregiver' | null>(null);
  const [language, setLanguage] = useState<'es' | 'ca'>('es');

  const texts = {
    es: {
      title: "PECS Pal",
      subtitle: "Tu compañero de comunicación",
      selectProfile: "Selecciona tu perfil",
      child: "Niña",
      caregiver: "Cuidador",
      language: "Idioma"
    },
    ca: {
      title: "PECS Pal",
      subtitle: "El teu company de comunicació",
      selectProfile: "Selecciona el teu perfil",
      child: "Nena",
      caregiver: "Cuidador",
      language: "Idioma"
    }
  };

  const currentTexts = texts[language];

  if (userType) {
    return <Dashboard userType={userType} language={language} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setLanguage('es')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                language === 'es'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Español
            </button>
            <button
              onClick={() => setLanguage('ca')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                language === 'ca'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              Català
            </button>
          </div>
        </div>

        {/* App Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{currentTexts.title}</h1>
          <p className="text-xl text-gray-600">{currentTexts.subtitle}</p>
        </div>

        {/* Profile Selection */}
        <Card className="p-6 shadow-xl bg-white/80 backdrop-blur-sm border-0">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            {currentTexts.selectProfile}
          </h2>
          
          <div className="space-y-4">
            <Button
              onClick={() => setUserType('child')}
              className="w-full h-16 text-xl font-medium bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 rounded-xl"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  😊
                </div>
                {currentTexts.child}
              </div>
            </Button>

            <Button
              onClick={() => setUserType('caregiver')}
              className="w-full h-16 text-xl font-medium bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200 rounded-xl"
            >
              <div className="flex items-center justify-center gap-3">
                <UserIcon className="w-8 h-8" />
                {currentTexts.caregiver}
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
