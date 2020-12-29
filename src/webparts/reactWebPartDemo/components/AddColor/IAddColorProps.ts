import { SPHttpClient } from "@microsoft/sp-http";

export type AddColorCallback = (colorName: string) => void;

export interface IAddColorProps {
    onAddColor: AddColorCallback;
    currentSiteUrl: any;
    spHttpClient: SPHttpClient;
}