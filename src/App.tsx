import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "./components/map/Map";
import TopNav from "./components/ui/TopNav";
import Card from "./components/ui/Card";
const queryClient = new QueryClient();
// TODO: Framer Motion
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-y-hidden transition-all duration-300">
        <a
          className="absolute left-2 top-2 z-[999]"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/alialjaffer"
        >
          <img
            src="/catus_64.png"
            className="w-[50%] border border-zinc-900 hover:cursor-pointer"
          />
        </a>
        <TopNav />
        <Map />
        <Card />
      </div>
    </QueryClientProvider>
  );
}

export default App;
