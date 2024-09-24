import { useGeolocation } from "@/hooks/useGeolocation";
import { Button } from "./button";
import { Input } from "./input";
import SearchResults from "./SearchResults";
import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

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
      className="absolute right-[50%] top-0 z-[99999] mt-10 flex w-72 translate-x-[50%] flex-col items-center justify-center gap-1"
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
      {
        /* {!geolocationPosition  */ false && (
          <Button
            onClick={getPosition}
            variant={"default"}
            className="mt-4 w-fit"
          >
            {isLoadingPosition ? "Loading..." : "Use current position"}
          </Button>
        )
      }
    </div>
  );
}
