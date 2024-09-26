import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "./button";
import { Input } from "./input";
import SearchResults from "./SearchResults";
import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import ReportDialog from "../pets/ReportDialog";
import About from "@/components/ui/About";

export default function TopNav() {
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [hideResults, setHideResults] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const ref = useOutsideClick<HTMLDivElement>(() => {
    setHideResults(true);
  });

  return (
    <div
      ref={ref}
      className="absolute right-[50%] top-0 z-[999] mt-10 flex w-72 translate-x-[50%] flex-col items-center justify-center gap-1 sm:w-96"
    >
      <div className={`"relative h-10 w-full`}>
        <Input
          type="search"
          placeholder="Search by city or pet name..."
          className="z-[999999] w-full rounded-full bg-zinc-100"
          autoComplete="off"
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setSearch(e.target.value);
              setHideResults(false);
            } else setHideResults(true);
          }}
          onFocus={() => setHideResults(false)}
        />
        {!hideResults && <SearchResults searchTerm={search} />}
        {/* <Button
            className="absolute right-0 top-0 rounded-full border bg-zinc-100 shadow-md"
            variant="link"
            type="submit"
          >
            Search
          </Button> */}
      </div>
      <div className="mt-2 flex flex-col items-center justify-center gap-2">
        {!geolocationPosition && hideResults && (
          <Button
            onClick={() => getPosition()}
            variant={"default"}
            className="w-fit sm:w-48"
          >
            {isLoadingPosition ? "Loading..." : "Use current position"}
          </Button>
        )}
        {hideResults && (
          <div className="flex items-center justify-center gap-1 sm:w-64 sm:gap-2">
            <ReportDialog />
            <About />
          </div>
        )}
      </div>
    </div>
  );
}
