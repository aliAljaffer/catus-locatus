import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "./components/map/Map";
import TopNav from "./components/ui/TopNav";
import Card from "./components/ui/Card";
import Logo from "./components/ui/Logo";
const queryClient = new QueryClient();
// TODO: Framer Motion
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex h-screen min-h-screen w-full items-center justify-center overflow-y-hidden transition-all duration-300">
        <Logo />
        <TopNav />
        <Map />
        <Card />
      </div>
    </QueryClientProvider>
  );
}

export default App;
