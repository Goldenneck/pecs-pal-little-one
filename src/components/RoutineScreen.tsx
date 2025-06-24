
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";

interface RoutineScreenProps {
  language: 'es' | 'ca';
}

const RoutineScreen = ({ language }: RoutineScreenProps) => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const texts = {
    es: {
      title: "Mi Rutina Diaria",
      morning: "Mañana",
      afternoon: "Tarde",
      evening: "Noche",
      completed: "¡Completado!",
      pending: "Pendiente"
    },
    ca: {
      title: "La Meva Rutina Diària",
      morning: "Matí",
      afternoon: "Tarda",
      evening: "Nit",
      completed: "Completat!",
      pending: "Pendent"
    }
  };

  const currentTexts = texts[language];

  const routines = [
    {
      period: currentTexts.morning,
      color: 'from-yellow-400 to-orange-500',
      tasks: [
        { id: 1, text: language === 'es' ? 'Levantarse' : 'Llevar-se', emoji: '🛏️', time: '08:00' },
        { id: 2, text: language === 'es' ? 'Lavarse los dientes' : 'Rentar-se les dents', emoji: '🦷', time: '08:15' },
        { id: 3, text: language === 'es' ? 'Desayunar' : 'Esmorzar', emoji: '🥞', time: '08:30' },
        { id: 4, text: language === 'es' ? 'Vestirse' : 'Vestir-se', emoji: '👕', time: '09:00' }
      ]
    },
    {
      period: currentTexts.afternoon,
      color: 'from-blue-400 to-cyan-500',
      tasks: [
        { id: 5, text: language === 'es' ? 'Almorzar' : 'Dinar', emoji: '🍽️', time: '13:00' },
        { id: 6, text: language === 'es' ? 'Tiempo de juego' : 'Temps de joc', emoji: '🎮', time: '15:00' },
        { id: 7, text: language === 'es' ? 'Merienda' : 'Berenar', emoji: '🍪', time: '17:00' }
      ]
    },
    {
      period: currentTexts.evening,
      color: 'from-purple-400 to-pink-500',
      tasks: [
        { id: 8, text: language === 'es' ? 'Cenar' : 'Sopar', emoji: '🍝', time: '20:00' },
        { id: 9, text: language === 'es' ? 'Baño' : 'Bany', emoji: '🛁', time: '21:00' },
        { id: 10, text: language === 'es' ? 'Dormir' : 'Dormir', emoji: '🌙', time: '22:00' }
      ]
    }
  ];

  const toggleTask = (taskId: number) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter(id => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {currentTexts.title}
      </h2>

      <div className="space-y-6">
        {routines.map((routine, routineIndex) => (
          <Card key={routineIndex} className="p-6 bg-white/90 shadow-lg border-0">
            <h3 className={`text-2xl font-semibold mb-4 bg-gradient-to-r ${routine.color} bg-clip-text text-transparent flex items-center gap-2`}>
              <Clock className="w-6 h-6" />
              {routine.period}
            </h3>
            
            <div className="grid gap-3">
              {routine.tasks.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                return (
                  <Button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`h-16 justify-between p-4 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-100 hover:bg-green-200 border-2 border-green-400 text-green-800'
                        : 'bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{task.emoji}</span>
                      <div className="text-left">
                        <div className="font-semibold text-lg">{task.text}</div>
                        <div className="text-sm opacity-70">{task.time}</div>
                      </div>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}>
                      {isCompleted && <Check className="w-5 h-5 text-white" />}
                    </div>
                  </Button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoutineScreen;
