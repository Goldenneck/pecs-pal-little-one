
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmotionsScreenProps {
  language: 'es' | 'ca';
}

const EmotionsScreen = ({ language }: EmotionsScreenProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const texts = {
    es: {
      title: "¿Cómo me siento?",
      selectEmotion: "Selecciona cómo te sientes",
      strategies: "Estrategias para sentirme mejor",
      noEmotion: "Selecciona una emoción para ver las estrategias"
    },
    ca: {
      title: "Com em sento?",
      selectEmotion: "Selecciona com et sents",
      strategies: "Estratègies per sentir-me millor",
      noEmotion: "Selecciona una emoció per veure les estratègies"
    }
  };

  const currentTexts = texts[language];

  const emotions = [
    {
      id: 'happy',
      name: language === 'es' ? 'Feliz' : 'Feliç',
      emoji: '😊',
      color: 'from-yellow-400 to-orange-500',
      strategies: [
        { emoji: '🎵', text: language === 'es' ? 'Escuchar música alegre' : 'Escoltar música alegre' },
        { emoji: '🤗', text: language === 'es' ? 'Abrazar a alguien' : 'Abraçar algú' },
        { emoji: '🎨', text: language === 'es' ? 'Dibujar algo bonito' : 'Dibuixar alguna cosa bonica' }
      ]
    },
    {
      id: 'sad',
      name: language === 'es' ? 'Triste' : 'Trist',
      emoji: '😢',
      color: 'from-blue-400 to-cyan-500',
      strategies: [
        { emoji: '🤗', text: language === 'es' ? 'Pedir un abrazo' : 'Demanar una abraçada' },
        { emoji: '📚', text: language === 'es' ? 'Leer un cuento favorito' : 'Llegir un conte preferit' },
        { emoji: '🎵', text: language === 'es' ? 'Escuchar música suave' : 'Escoltar música suau' }
      ]
    },
    {
      id: 'angry',
      name: language === 'es' ? 'Enfadada' : 'Enfadada',
      emoji: '😠',
      color: 'from-red-400 to-pink-500',
      strategies: [
        { emoji: '🫁', text: language === 'es' ? 'Respirar profundo' : 'Respirar profund' },
        { emoji: '🏃‍♀️', text: language === 'es' ? 'Ir a mi rincón de calma' : 'Anar al meu racó de calma' },
        { emoji: '🗣️', text: language === 'es' ? 'Hablar sobre lo que me molesta' : 'Parlar sobre el que em molesta' }
      ]
    },
    {
      id: 'scared',
      name: language === 'es' ? 'Asustada' : 'Espantada',
      emoji: '😨',
      color: 'from-purple-400 to-indigo-500',
      strategies: [
        { emoji: '🤗', text: language === 'es' ? 'Buscar a mamá o papá' : 'Buscar la mama o el papa' },
        { emoji: '🧸', text: language === 'es' ? 'Abrazar mi peluche favorito' : 'Abraçar el meu peluix preferit' },
        { emoji: '💡', text: language === 'es' ? 'Encender la luz' : 'Encendre el llum' }
      ]
    },
    {
      id: 'excited',
      name: language === 'es' ? 'Emocionada' : 'Emocionada',
      emoji: '🤩',
      color: 'from-green-400 to-emerald-500',
      strategies: [
        { emoji: '🎉', text: language === 'es' ? 'Compartir mi alegría' : 'Compartir la meva alegria' },
        { emoji: '🎨', text: language === 'es' ? 'Crear algo especial' : 'Crear alguna cosa especial' },
        { emoji: '💃', text: language === 'es' ? 'Bailar y moverme' : 'Ballar i moure\'m' }
      ]
    },
    {
      id: 'tired',
      name: language === 'es' ? 'Cansada' : 'Cansada',
      emoji: '😴',
      color: 'from-gray-400 to-slate-500',
      strategies: [
        { emoji: '🛏️', text: language === 'es' ? 'Descansar un poco' : 'Descansar una mica' },
        { emoji: '💧', text: language === 'es' ? 'Beber agua' : 'Beure aigua' },
        { emoji: '🧘‍♀️', text: language === 'es' ? 'Relajarme en silencio' : 'Relaxar-me en silenci' }
      ]
    }
  ];

  const selectedEmotionData = emotions.find(e => e.id === selectedEmotion);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {currentTexts.title}
      </h2>

      {/* Emotion Selection */}
      <Card className="p-6 mb-6 bg-white/90 shadow-lg border-0">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          {currentTexts.selectEmotion}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {emotions.map((emotion) => (
            <Button
              key={emotion.id}
              onClick={() => setSelectedEmotion(emotion.id)}
              className={`h-20 transition-all duration-300 transform hover:scale-105 ${
                selectedEmotion === emotion.id
                  ? `bg-gradient-to-r ${emotion.color} text-white shadow-xl scale-105`
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">{emotion.emoji}</span>
                <span className="font-medium">{emotion.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Strategies */}
      <Card className="p-6 bg-white/90 shadow-lg border-0">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          {currentTexts.strategies}
        </h3>
        
        {selectedEmotionData ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg bg-gradient-to-r ${selectedEmotionData.color} text-white mb-4`}>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedEmotionData.emoji}</span>
                <span className="text-2xl font-semibold">{selectedEmotionData.name}</span>
              </div>
            </div>
            
            <div className="grid gap-3">
              {selectedEmotionData.strategies.map((strategy, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">{strategy.emoji}</span>
                  <span className="text-lg font-medium text-gray-800">{strategy.text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic text-center py-8">
            {currentTexts.noEmotion}
          </p>
        )}
      </Card>
    </div>
  );
};

export default EmotionsScreen;
