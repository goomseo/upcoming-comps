import Header from "./components/Header";
import Finder from "./components/Finder";
import Rankings from "./components/Rankings";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />

      <main className="mx-auto px-4 py-8 sm:px-6">
        <section className="grid gap-6 min-w-0 xl:grid-cols-[1.6fr_1fr]">
          <Finder />
          <Rankings />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
