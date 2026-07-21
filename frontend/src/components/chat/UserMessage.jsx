function UserMessage({ message }) {
  return (
    <div className="flex justify-end">
      <div className="bg-accent/20 border border-accent p-4 rounded-2xl max-w-2xl">
        {message}
      </div>
    </div>
  );
}

export default UserMessage;