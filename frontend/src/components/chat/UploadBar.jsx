import { Paperclip, Image, Link, Type } from "lucide-react";
import { useRef, useState } from "react";

function UploadBar() {
  const fileRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="border border-white/10 rounded-2xl p-4 bg-black/20">
      {fileName && (
        <p className="mb-3 text-sm text-accent">Selected: {fileName}</p>
      )}

      <input
        ref={fileRef}
        type="file"
        hidden
        onChange={handleFile}
      />

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => fileRef.current.click()}
          className="bg-card px-4 py-3 rounded-xl flex gap-2"
        >
          <Paperclip size={16} />
          Attach File
        </button>

        <button className="bg-card px-4 py-3 rounded-xl flex gap-2">
          <Type size={16} />
          Text
        </button>

        <button className="bg-card px-4 py-3 rounded-xl flex gap-2">
          
          Image
        </button>

        <button className="bg-card px-4 py-3 rounded-xl flex gap-2">
          
          PDF
        </button>
      </div>
    </div>
  );
}

export default UploadBar;