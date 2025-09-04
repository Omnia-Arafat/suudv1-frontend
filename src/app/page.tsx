import FramerDemo from '../components/FramerDemo'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4">
        <FramerDemo />
      </main>
    </div>
  );
}
