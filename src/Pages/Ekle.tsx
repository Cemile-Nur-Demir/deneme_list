import { useState } from "react";

export default function Ekle() {
  const [formData, setFormData] = useState({
    adSoyad: "",
    email: "",
    gorevAdi: "",
    sure: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      ...formData,
      durationMinutes: Number(formData.sure),
    };

    const tasks = JSON.parse(localStorage.getItem("tasks_v1") || "[]");
    localStorage.setItem("tasks_v1", JSON.stringify([newTask, ...tasks]));

    alert(`Görev eklendi: ${newTask.gorevAdi} (${newTask.durationMinutes} dk)`);

    setFormData({
      adSoyad: "",
      email: "",
      gorevAdi: "",
      sure: "",
    });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8"
        onSubmit={handleSubmit}
      >
        {/* Ad Soyad */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="adSoyad"
          >
            Adı ve Soyadı
          </label>
          <input
            id="adSoyad"
            name="adSoyad"
            value={formData.adSoyad}
            onChange={handleChange}
            type="text"
            placeholder="Ali Veli"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Mail Adresi
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="ali_veli@outlook.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Görev Adı */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gorevAdi"
          >
            Görev Adı
          </label>
          <input
            id="gorevAdi"
            name="gorevAdi"
            value={formData.gorevAdi}
            onChange={handleChange}
            type="text"
            placeholder="Örn: Matematik"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Süre */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="sure"
          >
            Süre
          </label>
          <select
            id="sure"
            name="sure"
            value={formData.sure}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option value="">Seçiniz...</option>
            <option value="15">15 Dakika</option>
            <option value="30">30 Dakika</option>
            <option value="45">45 Dakika</option>
            <option value="60">1 Saat</option>
            <option value="90">1 Saat 30 Dakika</option>
            <option value="120">2 Saat</option>
          </select>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}