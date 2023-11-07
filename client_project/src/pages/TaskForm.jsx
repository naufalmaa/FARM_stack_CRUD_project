import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTask, createTask, updateTask, deleteTask } from "../api/tasks";

// import TaskCard from "../components/TaskCard";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

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

    try {
      if (!params.id) {
        const res = await createTask({title, description})
        console.log(res);
      } else {
        const res = await updateTask(params.id, {title, description});
        console.log(res);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
  };

  useEffect(() => {
    if (params.id) {
      fetchTask(params.id)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold my-4">
            {params.id ? "Update Task" : "Create Task"}
          </h1>
          <input
            type="text"
            placeholder="title"
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
          />
          <textarea
            placeholder="description"
            rows="3"
            className="block py-2 px-3 mb-4 w-full text-black"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
            {params.id ? "Update Task" : "Create Task"}
          </button>
        </form>

        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={async () => {
              try {
                const res = await deleteTask(params.id);
                console.log(res);
                navigate("/");
              } catch (error) {}
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;
