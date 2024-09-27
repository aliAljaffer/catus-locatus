import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";
type ReportDialogProps = {
  classNameProp?: string;
};
export default function ReportDialog({ classNameProp }: ReportDialogProps) {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn("text-xs uppercase", classNameProp)}
          size={"sm"}
        >
          <InfoCircledIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto max-h-[38rem] w-96 overflow-y-auto sm:w-[26rem] md:w-[28rem]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <img
              src="/catus_locatus_bg_4.png"
              className="mx-auto my-auto aspect-auto h-fit w-fit"
            />
          </DialogDescription>
        </DialogHeader>
        <p className="w-[98%] p-1 text-center indent-4 text-sm tracking-normal">
          Found a lost pet that you suspect has a previous owned? Have you
          yourself lost a furry friend, and would like help locating them? Fear
          not, for Catus Locatus is built to help reunite you with your tiny
          fur-ball! <br />
          The way reports work is that they'll use your current GPS location to
          make the report. You just press a button and your location is added to
          the report! Add your name and contact information, and people will be
          able to contact you about the reported pet.
        </p>
        <p className="w-[98%] p-1 text-center indent-4 text-sm tracking-normal">
          For any questions, contact{" "}
          <a
            className="text-center text-zinc-500 underline"
            href="https://github.com/alialjaffer"
            target="_blank"
            rel="noreferrer"
          >
            Ali on Github
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
