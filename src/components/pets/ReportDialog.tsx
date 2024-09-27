import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MakeReport from "./MakeReport";
import { TPet } from "./Pet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSetIsDialogOpen } from "@/store";
type ReportDialogProps = {
  petReported?: TPet;
  buttonLabel?: string;
  classNameProp?: string;
};
export default function ReportDialog({
  petReported,
  classNameProp,
  buttonLabel = "Report a Pet",
}: ReportDialogProps) {
  const isGlobalDialogOpen = useSetIsDialogOpen();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const petCaseId = petReported && petReported.caseId;
  return (
    <Dialog
      open={isDialogOpen}
      modal
      onOpenChange={() => {
        setIsDialogOpen(!isDialogOpen);
        isGlobalDialogOpen(!isDialogOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn("text-xs uppercase", classNameProp)}
          size={"sm"}
        >
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto max-h-[34rem] w-96 max-w-[26rem] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{`Report a ${petCaseId ? "Found" : "Lost"} Pet ${petCaseId ? "#" + petCaseId : ""}`}</DialogTitle>
          <DialogDescription>
            Make a report about a pet you lost or found.{" "}
            {petCaseId && (
              <span className="text-xs font-bold text-green-800">
                <br />
                Pet info was auto-filled. Please provide your info.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <MakeReport
          petReported={petReported}
          action={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
