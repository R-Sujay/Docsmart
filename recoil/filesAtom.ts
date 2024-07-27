import { atom } from "recoil";

export const filesState = atom<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData> | null>({
  key: "tabState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
