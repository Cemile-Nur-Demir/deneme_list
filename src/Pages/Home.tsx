import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaTasks, FaClock, FaTrash, FaEdit } from "react-icons/fa";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
      localStorage.clear(); // sadece test için!


    const storedTasks = JSON.parse(localStorage.getItem("tasks_v1") || "[]");

    if (storedTasks.length === 0) {
      // Başlangıç verileri
      const initialTasks = [
        {
          gorevAdi: "Matematik ödevini yap",
          adSoyad: "Ali Veli",
          email: "ali@example.com",
          durationMinutes: 30,
          completed: false,
        },
        {
          gorevAdi: "Kitap oku",
          adSoyad: "Ayşe Güneş",
          email: "ayse@example.com",
          durationMinutes: 45,
          completed: false,
        },
        {
          gorevAdi: "Spor yap",
          adSoyad: "Mehmet Yılmaz",
          email: "mehmet@example.com",
          durationMinutes: 60,
          completed: true,
        },
      ];
      localStorage.setItem("tasks_v1", JSON.stringify(initialTasks));
      setTasks(initialTasks);
    } else {
      setTasks(storedTasks);
    }
  }, []);

  const reloadTasks = () => {
    const reloaded = JSON.parse(localStorage.getItem("tasks_v1") || "[]");
    setTasks(reloaded);
  };

  const handleDelete = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    localStorage.setItem("tasks_v1", JSON.stringify(updatedTasks));
    reloadTasks();
  };

  const handleEdit = (task: any, index: number) => {
    setSelectedTask(task);
    setEditIndex(index);
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null && selectedTask) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = {
        ...selectedTask,
        durationMinutes: Number(selectedTask.durationMinutes),
      };
      localStorage.setItem("tasks_v1", JSON.stringify(updatedTasks));
      reloadTasks();
      setIsOpen(false);
      setSelectedTask(null);
      setEditIndex(null);
    }
  };

  const toggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    localStorage.setItem("tasks_v1", JSON.stringify(updatedTasks));
    reloadTasks();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Aktif Görevler
      </h2>

      {tasks.filter(t => !t.completed).length === 0 ? (
        <p className="text-center text-gray-500">Henüz aktif görev yok.</p>
      ) : (
        <div className="space-y-4">
          {tasks.filter(t => !t.completed).map((task, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center border border-gray-200"
            >
              <div>
                <div className="flex items-center mb-2">
                  <FaTasks className="w-5 h-5 mr-2 text-purple-600" />
                  <p className="text-lg font-semibold text-gray-800">
                    {task.gorevAdi}
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
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center text-blue-600 font-bold">
                  <FaClock className="w-4 h-4 mr-2" />
                  {task.durationMinutes} dk
                </div>
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => toggleComplete(index)}
                  className="w-5 h-5 accent-green-600"
                  title="Tamamlandı"
                />
                <button
                  onClick={() => handleEdit(task, index)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Düzenleme Modalı */}
      {isOpen && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSave}
            className="bg-white p-6 rounded shadow-md w-96"
          >
            <h3 className="text-lg font-bold mb-4">Görev Düzenle</h3>
            <input
              type="text"
              value={selectedTask.gorevAdi}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, gorevAdi: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Görev Adı"
            />
            <input
              type="text"
              value={selectedTask.adSoyad}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, adSoyad: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Ad Soyad"
            />
            <input
              type="email"
              value={selectedTask.email}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, email: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Email"
            />
            <input
              type="number"
              value={selectedTask.durationMinutes}
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  durationMinutes: e.target.value,
                })
              }
              className="w-full border rounded px-3 py-2 mb-3"
              placeholder="Süre (dk)"
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                İptal
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}