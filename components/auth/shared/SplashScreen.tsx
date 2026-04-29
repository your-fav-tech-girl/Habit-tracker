export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="flex h-screen items-center justify-center bg-white"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <p className="text-sm text-gray-500 mt-2">Loading...</p>
      </div>
    </div>
  );
}
