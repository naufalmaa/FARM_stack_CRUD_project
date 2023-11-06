import { useState } from "react";
import axios from "axios";

function TaskForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        // const res = await fetch('http://localhost:8000/api/tasks' , {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         title, 
        //         description
        //     }),
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // })

        // const data = await res.json()

        // this code above is the same as below, but the below one is shorter and simpler

        const res = await axios.post('http://localhost:8000/api/tasks', {
            title,
            description
        });

        console.log(res);
        e.target.reset();
    }
    

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          className="block py-2 px-3 mb-4 w-full text-black"
          onChange={(e) => setTitle(e.target.value) }
        />
        <textarea
        placeholder="description"
        rows="3"
        className="block py-2 px-3 mb-4 w-full text-black"
        onChange={(e) => setDescription(e.target.value) }
        />
        <button>save</button>
      </form>
    </div>
  );
}

export default TaskForm;
