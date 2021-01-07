import { IColorListService } from "../../../../Services/IColorListService";

export type AddColorCallback = (colorName: string) => void;

export interface IAddColorProps {
    onAddColor: AddColorCallback;
    // currentSiteUrl: any;
    // spHttpClient: SPHttpClient;
    colorListService: IColorListService;

}