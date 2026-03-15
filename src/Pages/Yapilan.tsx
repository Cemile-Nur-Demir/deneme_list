import { useState, useEffect } from "react";
import { FaTasks, FaUser, FaEnvelope, FaClock, FaCheckCircle } from "react-icons/fa";

export default function Completed() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks_v1") || "[]");
    setTasks(storedTasks);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Tamamlanan Görevler
      </h2>

      {tasks.filter(t => t.completed).length === 0 ? (
        <p className="text-center text-gray-500">Henüz tamamlanan görev yok.</p>
      ) : (
        <div className="space-y-4">
          {tasks.filter(t => t.completed).map((task, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-md rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center mb-2">
                <FaTasks className="w-5 h-5 mr-2 text-purple-600" />
                <p className="text-lg font-semibold text-gray-800 flex items-center">
                  {task.gorevAdi}
                  <FaCheckCircle className="ml-2 text-green-600" />
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <FaUser className="w-4 h-4 mr-2 text-blue-500" />
                {task.adSoyad}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FaEnvelope className="w-4 h-4 mr-2 text-green-500" />
                {task.email}
              </div>
              <div className="flex items-center text-blue-600 font-bold mt-2">
                <FaClock className="w-4 h-4 mr-2" />
                {task.durationMinutes} dk
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}