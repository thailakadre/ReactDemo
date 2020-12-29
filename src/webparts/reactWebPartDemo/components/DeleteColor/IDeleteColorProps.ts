import { IColor } from "../../../../Interfaces/IColor";

export type RemoveColorCallback = (color: IColor) => void;

export interface IDeleteColorProps {
    onRemoveColor: RemoveColorCallback;
    color: IColor;
}