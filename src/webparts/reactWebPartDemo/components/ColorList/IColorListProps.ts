import { IColor } from "../../../../Interfaces/IColor";
import { SPHttpClient } from "@microsoft/sp-http";

export type RemoveColorCallback = (color: IColor) => void;
export type UpdateColorCallback = (color: IColor) => void;

export interface IColorListProps {
    colors: IColor[];
    onRemoveColor: RemoveColorCallback;
    onUpdateColor: UpdateColorCallback;
    currentSiteUrl: any;
    spHttpClient: SPHttpClient;
}