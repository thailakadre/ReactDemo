import { IColorService } from "../../../../Services/IColorService";

export type AddColorCallback = (colorName: string) => void;

export interface IAddColorProps {
    onAddColor: AddColorCallback;
    colorListService: IColorService;
}