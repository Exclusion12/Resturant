import cors from "cors";

// var corsOptionsHandler: cors.CorsOptionsDelegate = (
//   req: cors.CorsRequest,
//   callback: (err: Error | null, ob?: cors.CorsOptions | undefined) => void
// ) => {
//   const whiteList = [
//     "http://localhost:3000",
//     "https://localhost:3443",
//     "http://localhost:2000",
//     "https://localhost:2443",
//   ];
//   var corsOptions: cors.CorsOptions = { origin: false };
//   if (req.headers.get("origin") !== null) {
//     let originUri: string = req.headers.get("origin")!;
//     if (whiteList.indexOf(originUri) !== -1) corsOptions = { origin: true };
//   }
//   return callback(null, corsOptions);
// };

const whiteList = [
  "http://localhost:3000",
  "https://localhost:3443",
  "http://localhost:2000",
  "https://localhost:2443",
];

const options: cors.CorsOptions = {
  origin: whiteList,
};
export const corsWithOptions = cors(options);
export const corsall = cors();
