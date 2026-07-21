import { Paperclip, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  const MAX_FILE_SIZE = 20 * 1024 * 1024;

  const handleSend = async () => {
    if (!message && !selectedFile) return;

    await onSend({
      text: message,
      file: selectedFile,
    });

    setMessage("");
    setSelectedFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, PNG, JPG allowed");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large (max 20MB)");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className="w-full bg-card rounded-2xl md:rounded-3xl border border-white/10 px-3 md:px-5 py-3 md:py-4 shadow-lg">
      {selectedFile && (
        <div className="mb-3 bg-black/20 rounded-xl px-3 md:px-4 py-3 flex justify-between items-center">
          <span className="text-xs md:text-sm text-accent truncate">
            {selectedFile.name}
          </span>

          <button
            onClick={removeFile}
            className="ml-3 p-1 rounded-full hover:bg-red-500/20 transition"
          >
            <X size={16} className="text-red-400" />
          </button>
        </div>
      )}

      <textarea
        rows="2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Veritas AI to verify something..."
        className="w-full bg-transparent resize-none outline-none text-sm md:text-base placeholder:text-muted"
      />

      <input
        type="file"
        hidden
        ref={fileRef}
        onChange={handleFileSelect}
      />

      <div className="flex flex-col md:flex-row justify-between gap-3 mt-3">
        
<div className="flex gap-2 flex-wrap">
  <button
    onClick={() => fileRef.current.click()}
    className="px-2 md:px-3 py-2 bg-black/20 rounded-xl flex items-center gap-2 text-xs md:text-sm hover:bg-black/30 transition"
  >
    <Paperclip size={14} />
    Attach
  </button>

  <button
    onClick={() => {
      setSelectedFile(null);
      setMessage("");
    }}
    className="px-2 md:px-3 py-2 bg-black/20 rounded-xl text-xs md:text-sm hover:bg-black/30 transition"
  >
    Text
  </button>

  <button
    onClick={() => fileRef.current.click()}
    className="px-2 md:px-3 py-2 bg-black/20 rounded-xl text-xs md:text-sm hover:bg-black/30 transition"
  >
    Image
  </button>

  <button
    onClick={() => fileRef.current.click()}
    className="px-2 md:px-3 py-2 bg-black/20 rounded-xl text-xs md:text-sm hover:bg-black/30 transition"
  >
    PDF
  </button>
</div>


        <button
          onClick={handleSend}
          className="w-10 h-10 md:w-11 md:h-11 self-end md:self-auto rounded-full bg-accent hover:bg-accent2 transition flex items-center justify-center shrink-0"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;