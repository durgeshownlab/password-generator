import {useCallback, useState, useEffect, useRef} from "react"

function App() {
  const [length, setLength]=useState(8);
  const [numberAllowed, setNumberAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false);
  const [password, setPassword]=useState("");
  const [btnText, setBtnText] = useState("Copy")
  const [btnBgColor, setBtnBgColor] = useState("rgb(29 78 216)")

  //useRef hook
  const passwordRef=useRef(null)

  const passwordGenerator = useCallback( ()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"

    if(charAllowed) str+="!@#$%^&*()_-+={}[]~`"

    for (let i = 1; i <= length; i++) {
       let char= Math.floor(Math.random()*str.length+1)
       pass += str.charAt(char)      
    }
    setBtnText('Copy')
    setBtnBgColor('rgb(29 78 216)')
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
    setBtnText("Copied")
    setBtnBgColor("Green")
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  }, [numberAllowed, length, charAllowed, passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white my-3 text-2xl">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef} />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" style={{backgroundColor: btnBgColor}}
          onClick={copyPasswordToClipboard} >{btnText}</button>
        </div>

        <div className="flex text-sm gap-x-2 mx-4">
          <div className="flex items-center gap-x-1 ">
            <input type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Range {length}</label>
          </div>

          <div className="flex items-center gap-x-1 ">
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" className="cursor-pointer"
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className="flex items-center gap-x-1" >
            <input type="checkbox" defaultChecked={charAllowed} id="charInput" className="cursor-pointer"
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
