import {
  Plus,
  FileText,
  Globe,
  Info,
  Settings,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/verifyit-logo.png";
import DeleteModal from "../common/DeleteModal";
import { useEffect, useState } from "react";
import {
  getUserChats,
  getChatDetails,
  deleteChat,
} from "../../api/chatApi";

function Sidebar() {
  const navigate = useNavigate();

  const [historyItems, setHistoryItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);
  const [chatToDelete, setChatToDelete] =
    useState(null);

  useEffect(() => {
    fetchChats();

    window.addEventListener("chat-created", fetchChats);

    return () => {
      window.removeEventListener(
        "chat-created",
        fetchChats
      );
    };
  }, []);

  const fetchChats = async () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    if (!user.token) {
      console.log("No JWT token found");
      return;
    }

    const chats = await getUserChats();
    setHistoryItems(chats);
  } catch (error) {
    console.error("Fetch chats failed:", error);
  }
};

  const startNewChat = () => {
    localStorage.removeItem("selectedChat");
    window.location.href = "/";
  };

  const openChat = async (chatId) => {
    try {
      const chat = await getChatDetails(chatId);

      localStorage.setItem(
        "selectedChat",
        JSON.stringify(chat)
      );

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteModal = (e, chatId) => {
    e.stopPropagation();
    setChatToDelete(chatId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteChat(chatToDelete);
      setShowDeleteModal(false);
      setChatToDelete(null);
      fetchChats();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-[250px] sm:w-[280px] lg:w-[290px] h-screen bg-sidebar border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-white/10 flex justify-center">
          <img
            src={logo}
            alt="Veritas AI"
            className="w-28 md:w-40 object-contain"
          />
        </div>

        {/* New Verification */}
        <div className="p-4 md:p-6">
          <button
            onClick={startNewChat}
            className="w-full bg-accent py-3 md:py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-accent2 transition text-sm md:text-base"
          >
            <Plus size={18} />
            New Verification
          </button>
        </div>

        {/* History */}
        <div className="px-3 md:px-6 flex-1 overflow-y-auto">
          <h2 className="text-muted uppercase text-xs md:text-sm mb-4">
            History
          </h2>

          {historyItems.length === 0 ? (
            <div className="text-muted text-xs md:text-sm bg-card p-4 rounded-xl">
              No previous verifications
            </div>
          ) : (
            historyItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openChat(item.id)}
                className="bg-card p-3 md:p-4 rounded-xl mb-3 cursor-pointer hover:bg-white/10 flex justify-between items-center"
              >
                <div className="flex gap-2 md:gap-3 items-center min-w-0">
                  <FileText size={15} />
                  <span className="text-xs md:text-sm truncate">
                    {item.title}
                  </span>
                </div>

                <button
                  onClick={(e) =>
                    openDeleteModal(e, item.id)
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom */}
        <div className="p-3 md:p-6 border-t border-white/10 space-y-2 md:space-y-3">
          <button
            onClick={() => navigate("/workflow")}
            className="w-full flex gap-3 items-center p-2 md:p-3 rounded-xl hover:bg-card text-sm"
          >
            <Globe size={18} />
            How It Works
          </button>

          <button
            onClick={() => navigate("/about")}
            className="w-full flex gap-3 items-center p-2 md:p-3 rounded-xl hover:bg-card text-sm"
          >
            <Info size={18} />
            About
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full flex gap-3 items-center p-2 md:p-3 rounded-xl hover:bg-card text-sm"
          >
            <Settings size={18} />
            Settings
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default Sidebar;