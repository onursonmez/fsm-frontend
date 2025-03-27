import { useState } from "react";
import { createTodo } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [formData, setFormData] = useState({title: "", description: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await createTodo(formData);
            toast.success("İşleminiz başarıyla tamamlandı.");
            navigate('/dashboard');
        } catch(error){
            toast.error('Hata! İşleminiz gerçekleştirilemedi!');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2">
                <label>Başlık</label>
                <input 
                    type="text"
                    className="border border-gray-200 p-2 rounded-md"
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                />
                <label>Açıklama</label>
                <textarea 
                    className="border border-gray-200 p-2 rounded-md" 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                >{formData.description}</textarea>
                <button className="bg-black text-white p-2 w-fit rounded-md" type="submit">Kaydet</button>
            </form>
        </div>
    );
}

export default Create;