// // pets.d.ts

// type TPosition = {
//   latitude: number;
//   longitude: number;
// };

// type TMicrochip = {
//   hasMicrochip: boolean;
//   microchipNumber: string | null; // Assuming it can be null if hasMicrochip is false
// };

// export type TPet = {
//   caseId: number;
//   name: string;
//   petType: "dog" | "cat"; // Specify allowed pet types
//   contact: string; // Phone or email
//   isLost: boolean;
//   caseStatus: "open" | "closed"; // Specify allowed case statuses
//   position: TPosition;
//   imageUrl: string;
//   description: string;
//   message: string;
//   reporterName: string;
//   reward: number;
//   breed: string;
//   tags: string[];
//   language:
//     | "ar"
//     | "en"
//     | "fr"
//     | "ja"
//     | "ru"
//     | "it"
//     | "zh"
//     | "hi"
//     | "es"
//     | "tr"
//     | "de"
//     | "pt"; // Supported languages
//   reportDate: string; // ISO8601 date format
//   microchip: TMicrochip;
// };

// export type TPetsResponse = {
//   pets: TPet[];
// };
