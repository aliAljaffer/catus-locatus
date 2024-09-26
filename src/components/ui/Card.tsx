import { TPet } from "../pets/Pet";
import {
  ArrowUpIcon,
  CubeIcon,
  InfoCircledIcon,
  Pencil1Icon,
  QuestionMarkCircledIcon,
  RocketIcon,
  TextAlignJustifyIcon,
  ArrowDownIcon,
  Pencil2Icon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import Feature from "../pets/Feature";
import {
  useChangeSelected,
  useIsCardShown,
  useIsDialogOpen,
  useSelectedId,
  useShowCard,
} from "@/store";
import useFetchAllPets from "@/hooks/useFetchAllPets";
import { Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { Button } from "./button";
import useOutsideClick from "@/hooks/useOutsideClick";
import { formatDate, obfuscate } from "@/utils/helpers";
import ReportDialog from "../pets/ReportDialog";

export default function Card() {
  const showMiniCard = useIsCardShown();
  const showCard = useShowCard();
  const selectedPetId = useSelectedId();
  const changeSelected = useChangeSelected();
  const isDialogOpen = useIsDialogOpen();
  const [expanded, setExpanded] = useState<boolean>(false);
  const ref = useOutsideClick<HTMLDivElement>(() => {
    if (isDialogOpen) return;
    setExpanded(false);
    showCard(false);
    changeSelected(-1);
  });
  const {
    data: petData,
    error: getPetError,
    isLoading: isLoadingGetPet,
  } = useFetchAllPets();
  if (isLoadingGetPet)
    return (
      <Spinner
        size={"3"}
        className="absolute right-[50%] top-0 z-[9999] h-screen -translate-x-[50%]"
      />
    );
  if (!selectedPetId) return null;
  if (!petData) return null;
  const pet: TPet | undefined = petData
    ?.filter((pet: TPet) => pet.caseId === selectedPetId)
    ?.at(0);
  if (!pet)
    return (
      <div
        ref={ref}
        className={`${showMiniCard ? "right-[50%] translate-x-[50%]" : "right-[100%] -translate-x-[100%]"} absolute bottom-0 z-[999] flex h-96 w-[95dvw] flex-col items-start justify-start gap-4 rounded-lg border border-input bg-zinc-100 bg-opacity-90 px-3 py-4 text-sm shadow-md transition-all duration-300 animate-in placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-[40rem] ${!expanded ? "translate-y-[70%]" : ""}`}
      ></div>
    );

  //   const translate = " translate-y-[70%]";

  if (getPetError?.message) return <p>{getPetError.message}</p>;
  const {
    breed,
    caseId,
    caseStatus,
    contact,
    description,
    imageUrl,
    isLost,
    // language,
    message,
    microchip,
    name,
    petType,
    reportDate,
    reporterName,
    reward,
    tags,
  }: TPet = pet;
  return (
    <div
      ref={ref}
      className={`${showMiniCard ? "right-[50%] translate-x-[50%]" : ""} absolute bottom-0 z-[999] flex h-96 w-[95dvw] flex-col items-start justify-start gap-4 rounded-lg border border-input bg-zinc-100 bg-opacity-90 px-3 py-4 text-sm shadow-md transition-all duration-300 animate-in placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:h-[21rem] sm:max-w-[40rem] ${!expanded ? "translate-y-[70%] sm:translate-y-[65%]" : ""}`}
    >
      {caseStatus === "open" && (
        <ReportDialog
          petReported={pet}
          classNameProp="absolute bottom-5 right-3 z-[99] animate-in"
        />
      )}
      <Button
        className="absolute -top-4 right-[50%] translate-x-[50%] animate-in"
        variant={"default"}
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
      </Button>
      <span
        className={`absolute right-4 top-2 w-fit rounded-lg ${caseStatus === "open" ? "bg-red-800" : "bg-green-800"} px-2 py-1 text-xs font-bold uppercase text-zinc-100`}
      >
        {caseStatus + " Case #: " + caseId}
      </span>
      <div className="relative flex h-14 w-full items-center justify-start gap-3">
        <img
          src={imageUrl}
          className="aspect-square h-full w-14 rounded-lg border border-transparent object-cover transition-all duration-300 animate-in hover:-translate-y-24 hover:translate-x-24 hover:scale-[300%] hover:cursor-pointer hover:border-zinc-200 sm:h-24 sm:w-24 sm:rounded-2xl"
          alt={`Portrait of a ${pet.petType} named ${pet.name}`}
        />
        <div className="flex h-fit flex-col items-start justify-start">
          <p className="text-lg font-bold tracking-wide">{name}</p>
          <p className="text-sm tracking-wide">{description}</p>
        </div>
      </div>
      <p className="flex items-center gap-1 text-sm">{message}</p>

      <div className="flex flex-wrap items-center justify-start gap-4">
        <Feature
          Icon={<QuestionMarkCircledIcon />}
          featureName="Pet type"
          content={petType}
        />
        <Feature
          Icon={<InfoCircledIcon />}
          featureName="Tags"
          content={tags.join(", ")}
        />
        <Feature
          Icon={<TextAlignJustifyIcon />}
          featureName="Breed"
          content={breed}
        />
        <Feature
          Icon={<CubeIcon />}
          featureName="Microchip?"
          content={
            microchip.hasMicrochip && microchip.microchipNumber
              ? microchip.microchipNumber
              : "N/A"
          }
        />
        <Feature
          Icon={<RocketIcon />}
          featureName="Reward?"
          content={reward + " SAR"}
        />
        <Feature
          Icon={<Pencil1Icon />}
          featureName="Lost/Found"
          content={isLost ? "Lost" : "Found"}
        />
      </div>
      <div className="relative mt-auto flex w-full flex-wrap items-center justify-start gap-1 rounded-lg border border-zinc-300 bg-zinc-200 p-2 sm:h-20 sm:gap-3">
        <span className="absolute -top-6 left-0 text-base font-bold tracking-wide">
          Reporter's Information
        </span>
        <Feature
          Icon={<Pencil2Icon />}
          featureName="Contact name"
          content={reporterName}
        />
        <Feature
          Icon={<CalendarIcon />}
          featureName="report date"
          content={formatDate(reportDate)}
        />
        <Feature
          Icon={<CalendarIcon />}
          featureName="Contact"
          content={obfuscate(contact)}
        />
      </div>
    </div>
  );
}
