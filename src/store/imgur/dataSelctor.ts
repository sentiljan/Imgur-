import { RootState } from "../index";

const dataSelector = (state: RootState) => state?.data;

export { dataSelector };
