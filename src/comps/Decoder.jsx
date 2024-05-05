import { useRef, useState } from "react";

const Decoder = (props) => {
    const [error, setError] = useState(false);
    const [pinError, setPINError] = useState(false);
    const [num, setNum] = useState('');
    const [output, setOutput] = useState('');

    const inpData = useRef()
    const inpPin = useRef()

    const encode = () => {
        var data = inpData.current.value;
        var pin = inpPin.current.value;
        if (data != '') {
            if (pin.length == 6) {
                // do it
                setOutput(base64ToString(strDecode(data, pin)));
            } else {
                setPINError(true);
            }
        } else {
            setError(true);
        }
    }

    const handleNumChange = event => {
        const limit = 6;
        setNum(event.target.value.slice(0, limit));
    };

    function strDecode(str, pin) {
        var strArry = str.split('')

        const pinPhaseD = (Phase) => {
            var pinArry = Phase.split('')
            var strLength = strArry.length - 1;
            var index1 = pinArry[0]
            var index2 = pinArry[1]

            var lastIndex = Number(index1) + Number(index2);
            while (strLength <= lastIndex) {
                lastIndex = lastIndex - strLength;
            }
            strArry.splice(lastIndex, 1);
            return strArry.join('');
        }

        // pin phase - III
        pinPhaseD(pin.substring(4, 6));
        // pin phase - II
        pinPhaseD(pin.substring(2, 4));
        // pin phase - I
        return pinPhaseD(pin.substring(0, 2));
    }

    function base64ToString(base64) {
        const binString = atob(base64);
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
        return new TextDecoder().decode(bytes);
    }

    return (
        <div style={{
            display: props.view == 'decoder' ? '' : 'none'
        }}>
            <textarea ref={inpData} onKeyUp={() => setError(false)} className="resize-none border-2 outline-none {{error ? 'text-red-600' : 'text-green-600'}} focus:border-green-400 p-[10px] rounded-md w-full" cols="50" rows="10" placeholder="Data to decode!" style={{
                border: error ? "2px red solid" : "",
            }}></textarea>
            <p className="mt-4 mb-2 text-gray-600 text-md">
                Your Six digit PIN
            </p>
            <div className="flex w-full gap-5">
                <input ref={inpPin} onKeyUp={() => setPINError(false)} onChange={handleNumChange} value={num} type="number" maxLength={6} className="border-2 outline-none focus:border-green-400 p-[10px] rounded-md w-5/6" placeholder="For example 455430" style={{
                    border: pinError ? "2px red solid" : "",
                }} />
                <button onClick={encode} className="bg-green-600 text-white rounded-md w-1/6">DECODE</button>
            </div>
            <p className="mt-1 text-red-600 text-sm" style={{
                display: pinError ? '' : 'none'
            }}>
                Please provide a valid PIN!
            </p>
            <div className="bg-gray-100 rounded mt-10 p-4 w-full hidden" style={{
                display: output == '' ? '' : 'inline-block'
            }}>
                <h3 className="text-xl font-bold text-slate-600">OUTPUT:</h3>
                <div className="flex gap-5 mt-4">
                    <span className="w-[90%] ">{output}</span>
                    <button onClick={() => navigator.clipboard.writeText(output)} className="border-[2px] duration-300 hover:bg-gray-500 hover:text-white text-gray-500 p-1 rounded-md w-[10%]">Copy</button>
                </div>
            </div>
        </div>
    )
}

export default Decoder;