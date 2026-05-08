import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import { Toaster } from "@/components/ui/sonner";

function App() {
    return (
        <div className="App min-h-screen bg-black text-white">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                    className: "!rounded-none !border !border-zinc-800 !bg-zinc-950 !text-white !font-mono !text-xs !uppercase !tracking-wider",
                }}
            />
        </div>
    );
}

export default App;
