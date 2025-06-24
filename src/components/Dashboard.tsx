
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Calendar, Smile, Gamepad2, ArrowLeft } from "lucide-react";
import CommunicationScreen from "./CommunicationScreen";
import RoutineScreen from "./RoutineScreen";
import EmotionsScreen from "./EmotionsScreen";
import GamesScreen from "./GamesScreen";

interface DashboardProps {
  userType: 'child' | 'caregiver';
  language: 'es' | 'ca';
}

type Screen = 'dashboard' | 'communication' | 'routine' | 'emotions' | 'games';

const Dashboard = ({ userType, language }: DashboardProps) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const texts = {
    es: {
      welcome: userType === 'child' ? "¡Hola pequeña!" : "Panel de control",
      speak: "Hablar",
      routine: "Mi rutina",
      feelings: "Cómo me siento",
      games: "Jugar",
      back: "Volver"
    },
    ca: {
      welcome: userType === 'child' ? "Hola petita!" : "Panell de control",
      speak: "Parlar",
      routine: "La meva rutina",
      feelings: "Com em sento",
      games: "Jugar",
      back: "Tornar"
    }
  };

  const currentTexts = texts[language];

  const menuItems = [
    {
      id: 'communication' as Screen,
      title: currentTexts.speak,
      icon: MessageSquare,
      color: 'from-green-400 to-emerald-500',
      hoverColor: 'from-green-500 to-emerald-600',
      emoji: '📣'
    },
    {
      id: 'routine' as Screen,
      title: currentTexts.routine,
      icon: Calendar,
      color: 'from-blue-400 to-cyan-500',
      hoverColor: 'from-blue-500 to-cyan-600',
      emoji: '🗓️'
    },
    {
      id: 'emotions' as Screen,
      title: currentTexts.feelings,
      icon: Smile,
      color: 'from-yellow-400 to-orange-500',
      hoverColor: 'from-yellow-500 to-orange-600',
      emoji: '😊'
    },
    {
      id: 'games' as Screen,
      title: currentTexts.games,
      icon: Gamepad2,
      color: 'from-purple-400 to-pink-500',
      hoverColor: 'from-purple-500 to-pink-600',
      emoji: '🎮'
    }
  ];

  if (currentScreen !== 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Back Button */}
        <div className="p-4">
          <Button
            onClick={() => setCurrentScreen('dashboard')}
            className="bg-white/80 text-gray-700 hover:bg-white shadow-md border-0"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {currentTexts.back}
          </Button>
        </div>

        {/* Screen Content */}
        <div className="px-4 pb-4">
          {currentScreen === 'communication' && <CommunicationScreen language={language} />}
          {currentScreen === 'routine' && <RoutineScreen language={language} />}
          {currentScreen === 'emotions' && <EmotionsScreen language={language} />}
          {currentScreen === 'games' && <GamesScreen language={language} />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {currentTexts.welcome}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Card
              key={item.id}
              className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Button
                onClick={() => setCurrentScreen(item.id)}
                className={`w-full h-32 text-white font-semibold text-2xl bg-gradient-to-r ${item.color} hover:${item.hoverColor} transition-all duration-300 border-0 shadow-none`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="text-4xl">{item.emoji}</div>
                  <div className="flex items-center gap-3">
                    <item.icon className="w-8 h-8" />
                    <span>{item.title}</span>
                  </div>
                </div>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
