import { useState, useEffect } from "react";
import "./App.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import spinner from "./assets/tube-spinner.svg";

function App() {
    const [Todos, setTodos] = useState([]);

    const [todoInput, settodoInput] = useState("");
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {getTodo()},[])

    function getTodo() {
        setLoading(true);
        fetch("http://localhost:3000/get/")
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then((data) => {
                setTodos(data.datas);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setLoading(false));
    }

    function updateTodo(index) {
        console.log(NextIDGuess())
        let temp = [...Todos];        
        temp[index].isCompleted = !temp[index].isCompleted;
        setTodos(temp);

        setLoading(true);
        fetch(
            `http://localhost:3000/update?todoid=${
                temp[index].todoID
            }&iscompleted=${temp[index].isCompleted ? 1 : 0}`
        )
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then((dat) => {})
            .catch((err) => {})
            .finally(() => {
                setLoading(false);
            });
    }

    function deleteTodo(index) {
        let _id = Todos.find((dat, ind) => ind === index);
        let datas = Todos.filter((dat, ind) => ind != index);

        setTodos(datas);
        console.log(_id);
        setLoading(true);
        fetch(`http://localhost:3000/delete?todoid=${_id.todoID}`)
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then((dat) => {})
            .catch((err) => {})
            .finally(() => {
                setLoading(false);
            });
    }

    function NextIDGuess() : Number {
        let temp = Todos.map((val) => val.todoID)
        temp.sort();
        temp.reverse();

        return temp[0]+1
    }
    

    function addTodo() {
        const text = todoInput.toString();
        if (todoInput.length > 0) {            
            setTodos([...Todos, {todoID: NextIDGuess(), todo: text, isCompleted: false}])

            setLoading(true);
            fetch(`http://localhost:3000/add?todo=${text}`)
                .then((res) => {
                    if (res.ok) return res.json();
                })
                .then((dat) => {})
                .catch((err) => {})
                .finally(() => {                                        
                    setLoading(false);           
                });
            settodoInput("");
        }

        getTodo()
    }

    return (
        <>
            <div className="h-screen flex items-center justify-center">
                {loading ? (
                    <img src={spinner} className="w-24 h-24"></img>
                ) : (
                    <ul className="text-2xl">
                        <li className="flex mb-5 gap-5">
                            <input
                                onChange={(e) => settodoInput(e.target.value)}
                                value={todoInput}
                                type="text"
                                className="border-2 border-black w-72 p-2 rounded-sm"
                            />
                            <button
                                onClick={(e) => addTodo()}
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
                                        <RiDeleteBin6Fill
                                            size={25}
                                            color="red"
                                        />
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
                                        <RiDeleteBin6Fill
                                            size={25}
                                            color="red"
                                        />
                                    </button>
                                </li>
                            )
                        )}
                    </ul>
                )}
            </div>
        </>
    );
}

export default App;
