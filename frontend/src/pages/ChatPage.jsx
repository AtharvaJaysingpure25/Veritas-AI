
import { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import WelcomeScreen from "../components/chat/WelcomeScreen";
import UserMessage from "../components/chat/UserMessage";
import ResultScreen from "../components/chat/ResultScreen";
import ChatInput from "../components/chat/ChatInput";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import ProcessingScreen from "../components/chat/ProcessingScreen";
import { createChat } from "../api/chatApi";
import {
  verifyText,
  verifyFile,
} from "../api/verificationApi";

function ChatPage() {
  const [chatStarted, setChatStarted] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUser(parsedUser);
    }

    const selectedChat = localStorage.getItem("selectedChat");

    if (selectedChat) {
      const chat = JSON.parse(selectedChat);

      setChatStarted(true);
      setUserMessage(chat.title);

      if (chat.verification_result) {
        try {
          const parsedResult =
            typeof chat.verification_result === "string"
              ? JSON.parse(chat.verification_result)
              : chat.verification_result;

          setVerificationResult(parsedResult);
          setShowResult(true);
        } catch (error) {
          console.error(
            "Error parsing chat result:",
            error
          );
        }
      }
    }
  }, []);

  const handleSend = async (data) => {
    setChatStarted(true);
    setLoading(true);
    setShowResult(false);
    setProcessingStage(0);

    setTimeout(() => setProcessingStage(1), 1500);
    setTimeout(() => setProcessingStage(2), 3500);
    setTimeout(() => setProcessingStage(3), 5500);

    try {
      let result;
      let inputType = "text";
      let extractedText = "";
      let title = "";

      if (data.file) {
        inputType = "file";
        title = data.file.name;
        setUserMessage(data.file.name);
        result = await verifyFile(data.file);
      } else {
        inputType = "text";
        title = data.text.slice(0, 40);
        setUserMessage(data.text);
        result = await verifyText(data.text);
      }

      setVerificationResult(result);

      extractedText =
        result.cleaned_text ||
        result.clean_text ||
        result.text ||
        "";

      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser
        ? JSON.parse(storedUser)
        : null;

      if (parsedUser?.token) {
        await createChat({
          title,
          input_type: inputType,
          extracted_text: extractedText,
          verification_result: JSON.stringify(result),
        });

        window.dispatchEvent(new Event("chat-created"));
      }

      setLoading(false);
      setShowResult(true);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
          "Verification failed"
      );

      setLoading(false);
      setShowResult(false);
    }
  };

  return (
    <MainLayout>
      {({ sidebarOpen, setSidebarOpen }) =>
        !chatStarted ? (
          <WelcomeScreen
            onSend={handleSend}
            isLoggedIn={isLoggedIn}
            user={user}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        ) : (
          <div className="h-screen flex flex-col overflow-hidden">
            <Navbar
              isLoggedIn={isLoggedIn}
              user={user}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-8 py-4 md:py-6 pb-44">
              <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
                <UserMessage message={userMessage} />

                {loading && (
                  <ProcessingScreen stage={processingStage} />
                )}

                {showResult && (
                  <ResultScreen data={verificationResult} />
                )}
              </div>
            </div>

            {!showResult && (
  <div className="absolute bottom-0 left-0 right-0 bg-bgPrimary p-3 md:p-6 border-t border-white/10">
    <div className="max-w-5xl mx-auto">
      <ChatInput onSend={handleSend} />
    </div>
  </div>
)}
          </div>
        )
      }
    </MainLayout>
  );
}

export default ChatPage;

