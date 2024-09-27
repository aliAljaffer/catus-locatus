import { useSetSkipAuth } from "./store";
import { APP_ROUTE } from "./utils/helpers";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

function Error() {
  const setSkipAuth = useSetSkipAuth();
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      404 | Page not found
      <div className="flex gap-4">
        <Button
          className=""
          onClick={() => {
            setSkipAuth(true);
            navigate(APP_ROUTE);
          }}
        >
          Go back
        </Button>
      </div>
    </div>
  );
}

export default Error;
