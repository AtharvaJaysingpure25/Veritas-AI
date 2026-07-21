function SettingsPage() {
  return (
    <div className="min-h-screen bg-bgPrimary text-white px-4 sm:px-6 md:px-10 py-8 md:py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
        Settings
      </h1>

      <div className="space-y-5 md:space-y-6 max-w-3xl">
        <div className="bg-card p-4 md:p-6 rounded-2xl">
          <h2 className="text-lg md:text-xl mb-4">Theme</h2>
          <button className="bg-accent px-4 md:px-5 py-3 rounded-xl text-sm md:text-base">
            Dark Mode Enabled
          </button>
        </div>

        <div className="bg-card p-4 md:p-6 rounded-2xl">
          <h2 className="text-lg md:text-xl mb-4">Notifications</h2>
          <label className="flex gap-3 text-sm md:text-base">
            <input type="checkbox" defaultChecked />
            Enable notifications
          </label>
        </div>

        <div className="bg-card p-4 md:p-6 rounded-2xl">
          <h2 className="text-lg md:text-xl mb-4">History</h2>
          <button className="bg-red-500 px-4 md:px-5 py-3 rounded-xl text-sm md:text-base">
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;