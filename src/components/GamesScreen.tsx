
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle, Star } from "lucide-react";

interface GamesScreenProps {
  language: 'es' | 'ca';
}

const GamesScreen = ({ language }: GamesScreenProps) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const texts = {
    es: {
      title: "Juegos",
      selectGame: "Selecciona un juego",
      score: "Puntuación",
      next: "Siguiente",
      playAgain: "Jugar otra vez",
      backToMenu: "Volver al menú"
    },
    ca: {
      title: "Jocs",
      selectGame: "Selecciona un joc",
      score: "Puntuació",
      next: "Següent",
      playAgain: "Jugar una altra vegada",
      backToMenu: "Tornar al menú"
    }
  };

  const currentTexts = texts[language];

  const games = [
    {
      id: 'match-emotions',
      name: language === 'es' ? 'Emparejar Emociones' : 'Aparellar Emocions',
      emoji: '😊',
      color: 'from-yellow-400 to-orange-500',
      description: language === 'es' ? 'Conecta cada emoción con su situación' : 'Connecta cada emoció amb la seva situació'
    },
    {
      id: 'sequence',
      name: language === 'es' ? 'Secuencias' : 'Seqüències',
      emoji: '🔢',
      color: 'from-blue-400 to-cyan-500',
      description: language === 'es' ? 'Ordena las actividades correctamente' : 'Ordena les activitats correctament'
    },
    {
      id: 'word-picture',
      name: language === 'es' ? 'Palabra e Imagen' : 'Paraula i Imatge',
      emoji: '🎨',
      color: 'from-green-400 to-emerald-500',
      description: language === 'es' ? 'Conecta cada palabra con su imagen' : 'Connecta cada paraula amb la seva imatge'
    }
  ];

  const matchEmotionsQuestions = [
    {
      emotion: { emoji: '😊', text: language === 'es' ? 'Feliz' : 'Feliç' },
      situations: [
        language === 'es' ? 'Recibir un regalo' : 'Rebre un regal',
        language === 'es' ? 'Perder un juguete' : 'Perdre una joguina',
        language === 'es' ? 'Jugar con amigos' : 'Jugar amb amics'
      ],
      correct: 0
    },
    {
      emotion: { emoji: '😢', text: language === 'es' ? 'Triste' : 'Trist' },
      situations: [
        language === 'es' ? 'Ganar un juego' : 'Guanyar un joc',
        language === 'es' ? 'Romper algo importante' : 'Trencar alguna cosa important',
        language === 'es' ? 'Comer helado' : 'Menjar gelat'
      ],
      correct: 1
    }
  ];

  const resetGame = () => {
    setCurrentGame(null);
    setScore(0);
    setCurrentQuestion(0);
  };

  const renderMatchEmotionsGame = () => {
    const question = matchEmotionsQuestions[currentQuestion];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-6xl mb-2">{question.emotion.emoji}</div>
          <h3 className="text-2xl font-semibold">{question.emotion.text}</h3>
          <p className="text-gray-600 mt-2">
            {language === 'es' ? '¿Cuándo te sientes así?' : 'Quan et sents així?'}
          </p>
        </div>

        <div className="grid gap-3">
          {question.situations.map((situation, index) => (
            <Button
              key={index}
              onClick={() => {
                if (index === question.correct) {
                  setScore(score + 1);
                }
                if (currentQuestion < matchEmotionsQuestions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  // Game finished
                  setTimeout(() => {
                    alert(language === 'es' ? `¡Juego terminado! Puntuación: ${score + (index === question.correct ? 1 : 0)}/${matchEmotionsQuestions.length}` : `Joc acabat! Puntuació: ${score + (index === question.correct ? 1 : 0)}/${matchEmotionsQuestions.length}`);
                    resetGame();
                  }, 500);
                }
              }}
              className="h-16 text-lg bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 text-gray-800"
            >
              {situation}
            </Button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            {currentTexts.score}: {score} / {matchEmotionsQuestions.length}
          </p>
        </div>
      </div>
    );
  };

  if (currentGame === 'match-emotions') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {language === 'es' ? 'Emparejar Emociones' : 'Aparellar Emocions'}
          </h2>
          <Button onClick={resetGame} variant="outline">
            {currentTexts.backToMenu}
          </Button>
        </div>

        <Card className="p-6 bg-white/90 shadow-lg border-0">
          {renderMatchEmotionsGame()}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {currentTexts.title}
      </h2>

      <Card className="p-6 bg-white/90 shadow-lg border-0">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          {currentTexts.selectGame}
        </h3>
        
        <div className="grid gap-4">
          {games.map((game) => (
            <Button
              key={game.id}
              onClick={() => setCurrentGame(game.id)}
              className={`h-24 bg-gradient-to-r ${game.color} hover:opacity-90 text-white transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{game.emoji}</span>
                  <div className="text-left">
                    <div className="text-xl font-semibold">{game.name}</div>
                    <div className="text-sm opacity-90">{game.description}</div>
                  </div>
                </div>
                <Star className="w-6 h-6" />
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default GamesScreen;
