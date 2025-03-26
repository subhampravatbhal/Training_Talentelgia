import { useState, useEffect } from "react";

const TodoApp = () => {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
        if (Array.isArray(savedTodos)) {
            setTodos(savedTodos);
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = () => {
        if (inputText.trim().length < 3) {
            alert("Add at least 3 characters");
            return;
        }

        setTodos((prevTodos) => {
            const updatedTodos = editIndex !== null
                ? prevTodos.map((todo, index) =>
                    index === editIndex ? { ...todo, text: inputText } : todo
                )
                : [...prevTodos, { text: inputText, completed: false }];

            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });

        setInputText("");
        setEditIndex(null);
    };

    const deleteTodo = (index: number) => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.filter((_, i) => i !== index);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    const editTodo = (index: number) => {
        setInputText(todos[index].text);
        setEditIndex(index);
    };

    const toggleComplete = (index: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Todo App</h1>
            <div style={{ display: "flex", marginBottom: "10px" }}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{
                        flex: 1,
                        height: "40px",
                        fontSize: "16px",
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        marginRight: "10px",
                        color: "#fff", // Set text color to white
                    }}
                />
                <button
                    onClick={() => {
                        addTodo();
                        setInputText(""); // Clear input after adding
                    }}
                    style={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    {editIndex !== null ? "Edit" : "Add"}
                </button>
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        onClick={(e) => {
                            if (!(e.target as HTMLElement).closest("button")) {
                                toggleComplete(index);
                            }
                        }}
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            marginBottom: "5px",
                            backgroundColor: "#f9f9f9",
                            color:"#000"
                        }}
                    >
                        <span style={{ flex: 1 }}>{todo.text}</span>
                        <div>
                            <button
                                onClick={() => editTodo(index)}
                                style={{
                                    backgroundColor: "#ffc107",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    marginRight: "5px",
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTodo(index)}
                                style={{
                                    backgroundColor: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;