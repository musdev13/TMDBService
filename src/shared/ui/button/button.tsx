interface ButtonProps {
    type: "submit" | "reset" | "button";
    children: React.ReactNode;
}

export function Button({type, children}:ButtonProps){
    const styles = type === "submit" ?
        "bg-blue-600 hover:bg-blue-700 text-white" :
            type === "button" ?
                "bg-gray-600 hover:bg-gray-700 text-white" :
                    "bg-red-600 hover:bg-red-700 text-white"
    return <button
        type={type}
        className={`px-6 py-2 ${styles} font-semibold rounded-md transition`}
      >
        {children}
      </button>
}