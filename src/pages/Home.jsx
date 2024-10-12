import { useState , useEffect, useRef} from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

// import Clock from "../Components/Clock";

function Home() {
  const modalBtn = useRef()
  const [input, setInput] = useState("");
  const [tasks, setTask] = useState(()=>{
    const savedTask = localStorage.getItem("tasks")
      return savedTask ? JSON.parse(localStorage.getItem("tasks")) : [];
  
  });
  const [modalInput,  setModalInput] = useState()

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
 
  const formSubmit = (e) => {
    e.preventDefault();
    if (!input) return alert('input task!') ;
    if (tasks.includes(input)) {
      setModalInput(input)
      setInput("");
      modalBtn.current.showModal()
      // alert( ` "${input} " you added `);
      return;
    }
    setTask((prev) => [...prev, input]);
    setInput("");
  };

  const handelClearBtn = () => {
    setTask("");
  };
  const handelCheck = (value) => {
    const data = tasks.filter((task) => task !== value);
    setTask(data);
  };
  const handelCheck2 = (e) => {
   e.target.parentElement.parentElement.classList.toggle("line-through");
   e.target.parentElement.parentElement.classList.toggle("decoration-rose-500");



  };

  return (
    <>
      <div className=" container mx-auto text-center">
        <h1 className=" md:w-1/2 mx-auto p-3 rounded-lg mt-5 text-white font-bold text-2xl bg-gradient-to-l from-violet-500 to-blue-500">
          Todo App
        </h1>

        {/* <Clock /> */}

        <form onSubmit={formSubmit}>
          <div className="mt-5">
            <input
              className="border border-blue-500 rounded-l-lg px-3 py-2 rounded-r-sm"
              placeholder="write your task"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-violet-500 rounded-r-lg px-3 py-2 text-white"
            >
              add task
            </button>
          </div>
        </form>

        <div className=" transition">
          {tasks.length > 0 ? (
            <>
              {tasks.map((task, index) => {
                return (
                  <li
                    className=" flex justify-center items-center list-none bg-gradient-to-l from-violet-500 to-blue-500 w-[95%] md:w-2/6 mx-auto my-2 p-3 rounded-lg text-white text-xl shadow-md shadow-blue-200"
                    key={index}
                  >
                    {task}

                    <button
                      onClick={(e) => {
                        handelCheck2(e);
                      }}
                      className="mx-2 text-green-500 bg-white p-2 text-2xl rounded-full hover:bg-green-500 hover:text-white transition"
                    >
                      <FaCheck />
                    </button>

                    <button
                      onClick={() => {
                        handelCheck(task);
                      }}
                    >
                      <MdDeleteForever className="text-red-500 bg-white p-2 text-4xl rounded-full hover:bg-rose-500 hover:text-white transition" />
                    </button>
                  </li>
                );
              })}
              <button
                onClick={handelClearBtn}
                className=" bg-rose-600 text-white p-2 my-3 rounded-md"
              >
                Clear All
              </button>
            </>
          ) : (
            <p className="text-lg text-center text-gray-400 font-semibold mt-5">
              no task added yet
            </p>
          )}
        </div>
      </div>

      {/* modal  */}
    


<dialog ref={modalBtn}  className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle bg-rose-200 text-rose-700 btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Oops!</h3>
    <p className="py-4">already the task <span className="font-bold text-rose-500">{modalInput}</span> added in the task list.</p>
  </div>
</dialog>

    </>
  );
}

export default Home;
