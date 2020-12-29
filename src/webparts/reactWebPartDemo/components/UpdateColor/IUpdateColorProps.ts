import { IColor } from "../../../../Interfaces/IColor";
import { SPHttpClient } from "@microsoft/sp-http";

export type UpdateColorCallback = (color: IColor) => void;

export interface IUpdateColorProps {
    onUpdateColor: UpdateColorCallback;
    color: IColor;
    currentSiteUrl: any;
    spHttpClient: SPHttpClient;
}