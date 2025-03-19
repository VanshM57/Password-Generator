import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_+-/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-yellow-400 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-700 opacity-20 blur-3xl"></div>
      <div className="w-full max-w-lg mx-auto bg-yellow-900 bg-opacity-20 backdrop-blur-lg p-6 rounded-2xl shadow-2xl text-white relative z-10 border border-yellow-500">
        <h1 className="text-center text-3xl font-bold mb-6 text-yellow-400">Password Generator</h1>
        <div className="flex items-center border border-yellow-500 rounded-lg overflow-hidden mb-6 bg-black bg-opacity-40">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 bg-transparent text-yellow-400 placeholder-yellow-300"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-400 px-6 py-3 text-black font-semibold transition-all"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between text-sm">
            <label className="text-yellow-300">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-2/3 accent-yellow-500"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between text-sm gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="cursor-pointer w-5 h-5 accent-yellow-500"
              />
              <label htmlFor="numberInput" className="text-yellow-300">Include Numbers</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={charAllowed}
                id="characterInput"
                onChange={() => setCharAllowed((prev) => !prev)}
                className="cursor-pointer w-5 h-5 accent-yellow-500"
              />
              <label htmlFor="characterInput" className="text-yellow-300">Include Symbols</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
