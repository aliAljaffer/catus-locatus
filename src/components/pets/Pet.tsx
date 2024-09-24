type TPosition = {
  latitude: number;
  longitude: number;
};

type TMicrochip = {
  hasMicrochip: boolean;
  microchipNumber: string | null; // Assuming it can be null if hasMicrochip is false
};

export type TPet = {
  caseId: number;
  name: string;
  petType: "dog" | "cat"; // Specify allowed pet types
  contact: string; // Phone or email
  isLost: boolean;
  caseStatus: "open" | "closed"; // Specify allowed case statuses
  position: TPosition;
  imageUrl: string;
  description: string;
  message: string;
  reporterName: string;
  reward: number;
  breed: string;
  tags: string[];
  language:
    | "ar"
    | "en"
    | "fr"
    | "ja"
    | "ru"
    | "it"
    | "zh"
    | "hi"
    | "es"
    | "tr"
    | "de"
    | "pt";
  reportDate: string; // ISO8601 date format
  microchip: TMicrochip;
};

type PetProps = {
  pet: TPet;
  minifiedCard: boolean;
};

export default function Pet({ pet, minifiedCard }: PetProps) {
  if (minifiedCard)
    return (
      <div className="flex h-full w-full gap-2 text-xs">
        <img src={pet.imageUrl} className="h-12 w-12" />
        <div className="flex flex-col items-center justify-start">
          <p className="m-0">{pet.name}</p>
          <span className="">{pet.description}</span>
          <p className="">{pet.message}</p>
          <p className="">
            Contact: {pet.reporterName} at {pet.contact}
          </p>
        </div>
      </div>
    );
  return <div>{pet.breed}</div>;
}
