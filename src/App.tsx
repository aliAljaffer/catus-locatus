import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "./components/map/Map";
import TopNav from "./components/ui/TopNav";
import Card from "./components/ui/Card";

const queryClient = new QueryClient();
// TODO: Framer Motion
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex h-screen w-full items-center justify-center transition-all duration-300">
        <TopNav />
        <Map />
        <Card />
      </div>
    </QueryClientProvider>
  );
}

export default App;
