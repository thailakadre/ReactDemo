import { IColor } from "../../../../Interfaces/IColor";
import { SPHttpClient } from "@microsoft/sp-http";
import { IColorService } from "../../../../Services/IColorService";

export type RemoveColorCallback = (color: IColor) => void;
export type UpdateColorCallback = (color: IColor) => void;

export interface IColorListProps {
    colors: IColor[];
    onRemoveColor: RemoveColorCallback;
    onUpdateColor: UpdateColorCallback;
    colorService: IColorService;
}