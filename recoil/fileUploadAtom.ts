import { atom, AtomOptions } from "recoil";

type FileStateType = string | null;

export const tabState = atom({
  key: "tabState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const progressState = atom({
  key: "progressState", // unique ID (with respect to other atoms/selectors)
  default: null as number | null, // default value (aka initial value)
});

export const fileIdState = atom({
  key: "fileIdState", // unique ID (with respect to other atoms/selectors)
  default: null as FileStateType, // default value (aka initial value)
});

export const statusState = atom({
  key: "statusState", // unique ID (with respect to other atoms/selectors)
  default: null as FileStateType, // default value (aka initial value)
});

// export const tabState = atom({
//   key: "tabState", // unique ID (with respect to other atoms/selectors)
//   default: 3, // default value (aka initial value)
// });

// export const progressState = atom({
//   key: "progressState", // unique ID (with respect to other atoms/selectors)
//   default: 80, // default value (aka initial value)
// });

// export const fileIdState = atom({
//   key: "fileIdState", // unique ID (with respect to other atoms/selectors)
//   default: null as FileStateType, // default value (aka initial value)
// });

// export const statusState = atom({
//   key: "statusState", // unique ID (with respect to other atoms/selectors)
//   default: "Saving file to database...", // default value (aka initial value)
// });
