function AIMessage({ message }) {
  return (
    <div className="flex justify-start">
      <div className="bg-card border border-white/10 p-4 rounded-2xl max-w-2xl">
        {message}
      </div>
    </div>
  );
}

export default AIMessage;