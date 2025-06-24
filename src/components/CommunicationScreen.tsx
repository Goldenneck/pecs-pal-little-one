
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";

interface CommunicationScreenProps {
  language: 'es' | 'ca';
}

const CommunicationScreen = ({ language }: CommunicationScreenProps) => {
  const [selectedPictograms, setSelectedPictograms] = useState<any[]>([]);

  const texts = {
    es: {
      title: "Comunicación",
      categories: "Categorías",
      myPhrase: "Mi frase",
      clear: "Limpiar",
      speak: "Hablar"
    },
    ca: {
      title: "Comunicació",
      categories: "Categories",
      myPhrase: "La meva frase",
      clear: "Netejar",
      speak: "Parlar"
    }
  };

  const currentTexts = texts[language];

  const categories = [
    {
      name: language === 'es' ? 'Necesidades' : 'Necessitats',
      color: 'from-red-400 to-pink-500',
      pictograms: [
        { id: 1, text: language === 'es' ? 'Agua' : 'Aigua', emoji: '💧', audio: 'water' },
        { id: 2, text: language === 'es' ? 'Comida' : 'Menjar', emoji: '🍎', audio: 'food' },
        { id: 3, text: language === 'es' ? 'Baño' : 'Bany', emoji: '🚽', audio: 'bathroom' },
        { id: 4, text: language === 'es' ? 'Ayuda' : 'Ajuda', emoji: '🙋‍♀️', audio: 'help' }
      ]
    },
    {
      name: language === 'es' ? 'Emociones' : 'Emocions',
      color: 'from-yellow-400 to-orange-500',
      pictograms: [
        { id: 5, text: language === 'es' ? 'Feliz' : 'Feliç', emoji: '😊', audio: 'happy' },
        { id: 6, text: language === 'es' ? 'Triste' : 'Trist', emoji: '😢', audio: 'sad' },
        { id: 7, text: language === 'es' ? 'Enfadada' : 'Enfadada', emoji: '😠', audio: 'angry' },
        { id: 8, text: language === 'es' ? 'Cansada' : 'Cansada', emoji: '😴', audio: 'tired' }
      ]
    },
    {
      name: language === 'es' ? 'Actividades' : 'Activitats',
      color: 'from-green-400 to-emerald-500',
      pictograms: [
        { id: 9, text: language === 'es' ? 'Jugar' : 'Jugar', emoji: '🎮', audio: 'play' },
        { id: 10, text: language === 'es' ? 'Leer' : 'Llegir', emoji: '📚', audio: 'read' },
        { id: 11, text: language === 'es' ? 'Música' : 'Música', emoji: '🎵', audio: 'music' },
        { id: 12, text: language === 'es' ? 'Dormir' : 'Dormir', emoji: '🛏️', audio: 'sleep' }
      ]
    }
  ];

  const addPictogram = (pictogram: any) => {
    if (selectedPictograms.length < 5) {
      setSelectedPictograms([...selectedPictograms, pictogram]);
    }
  };

  const removePictogram = (index: number) => {
    setSelectedPictograms(selectedPictograms.filter((_, i) => i !== index));
  };

  const clearPhrase = () => {
    setSelectedPictograms([]);
  };

  const speakPhrase = () => {
    const text = selectedPictograms.map(p => p.text).join(' ');
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-ES' : 'ca-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {currentTexts.title}
      </h2>

      {/* Selected Phrase Area */}
      <Card className="p-6 mb-6 bg-white/90 shadow-lg border-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-700">{currentTexts.myPhrase}</h3>
          <div className="flex gap-2">
            <Button onClick={clearPhrase} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              {currentTexts.clear}
            </Button>
            <Button 
              onClick={speakPhrase} 
              className="bg-green-500 hover:bg-green-600"
              disabled={selectedPictograms.length === 0}
            >
              <Play className="w-4 h-4 mr-2" />
              {currentTexts.speak}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-50 rounded-lg">
          {selectedPictograms.map((pictogram, index) => (
            <div
              key={`${pictogram.id}-${index}`}
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => removePictogram(index)}
            >
              <span className="text-2xl">{pictogram.emoji}</span>
              <span className="font-medium">{pictogram.text}</span>
            </div>
          ))}
          {selectedPictograms.length === 0 && (
            <p className="text-gray-500 italic">{language === 'es' ? 'Selecciona pictogramas para crear una frase' : 'Selecciona pictogrames per crear una frase'}</p>
          )}
        </div>
      </Card>

      {/* Categories */}
      <div className="space-y-6">
        {categories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="p-6 bg-white/90 shadow-lg border-0">
            <h3 className={`text-xl font-semibold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
              {category.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.pictograms.map((pictogram) => (
                <Button
                  key={pictogram.id}
                  onClick={() => addPictogram(pictogram)}
                  className="h-20 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                  disabled={selectedPictograms.length >= 5}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{pictogram.emoji}</span>
                    <span className="text-sm font-medium">{pictogram.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunicationScreen;
