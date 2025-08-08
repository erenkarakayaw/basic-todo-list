import { useState, useEffect } from "react";
import "./App.css";
import { RiDeleteBin6Fill } from "react-icons/ri";

function App() {

    const [Todos, setTodos] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3000/")
                .then((res) => {
                    if (res.ok) return res.json();
                })
                .then((data) => {
                    setTodos(data.datas)
                })
                .catch((err) => console.log(err));
    }, []);    

    
    const [todoInput, settodoInput] = useState("");

    function updateTodo(index) {
        let temp = [...Todos];
        temp[index].isCompleted = !temp[index].isCompleted;
        setTodos(temp);
    }

    function deleteTodo(index) {
        setTodos(Todos.filter((dat, ind) => ind != index));
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <ul className="text-2xl">
                    <li className="flex mb-5 gap-5">
                        <input
                            onChange={(e) => settodoInput(e.target.value)}
                            value={todoInput}
                            type="text"
                            className="border-2 border-black w-72 p-2 rounded-sm"
                        />
                        <button
                            onClick={(e) => {
                                setTodos((prev) => [
                                    ...prev,
                                    { todo: todoInput, isCompleted: false },
                                ]);
                                settodoInput("");
                            }}
                            className="rounded-sm duration-200 hover:bg-blue-600 active:bg-blue-700 cursor-pointer bg-blue-500 text-white w-24"
                        >
                            Add
                        </button>
                    </li>
                    <li className="mb-2">
                        <h1 className=" text-4xl font-bold">Todos:</h1>
                        <div className="w-full h-1 bg-black"></div>
                    </li>
                    {Todos.map((dat, index) =>
                        !dat.isCompleted ? (
                            <li
                                className="my-8 w-96 flex justify-between items-center"
                                key={index}
                            >
                                <input
                                    onChange={(e) => updateTodo(index)}
                                    className="mr-5 w-5 h-5"
                                    type="checkbox"
                                />
                                {dat.todo}
                                <button
                                    onClick={(e) => deleteTodo(index)}
                                    className="ml-5 active:hover:bg-red-500/30 w-10 h-10 hover:bg-red-500/20 cursor-pointer rounded-full duration-200  flex justify-center items-center"
                                >
                                    <RiDeleteBin6Fill size={25} color="red" />
                                </button>
                            </li>
                        ) : (
                            <li
                                className="my-8 w-96 justify-between line-through flex items-center"
                                key={index}
                            >
                                <input
                                    onChange={(e) => updateTodo(index)}
                                    checked
                                    className="mr-5 w-5 h-5"
                                    type="checkbox"
                                />
                                {dat.todo}
                                <button
                                    onClick={(e) => deleteTodo(index)}
                                    className="ml-5 active:hover:bg-red-500/30 w-10 h-10 hover:bg-red-500/20 cursor-pointer rounded-full duration-200  flex justify-center items-center"
                                >
                                    <RiDeleteBin6Fill size={25} color="red" />
                                </button>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </>
    );
}

export default App;
