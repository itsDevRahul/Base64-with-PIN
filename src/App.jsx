import { useState } from "react";
import Decoder from "./comps/Decoder";
import Encoder from "./comps/Encoder";

function App() {
  const [open, setOpen] = useState('encoder');

  const change = (view) => {
    setOpen(view)
  }

  return (
    <div className="container max-w-[1200px] my-8 mx-auto">
      <h1 className="text-3xl font-bold text-center m-2">Base 64 + PIN</h1>
      <div className="flex mt-10 mb-4">
        <button onClick={ ()=> change('encoder')} className="text-xl text-green-600 font-semibold bg-gray-100 rounded-t-md w-[50%] p-2" style={{
          background: open == 'encoder' ? 'white' : ''
        }}>Encoder</button>
        <button onClick={ ()=> change('decoder')} className="text-xl text-slate-600 font-semibold bg-gray-100 rounded-t-md w-[50%] p-2" style={{
          background: open == 'decoder' ? 'white' : ''
        }}>Decoder</button>
      </div>
      <Encoder view={open}/>
      <Decoder view={open}/>
    </div>
  );
}

export default App;
