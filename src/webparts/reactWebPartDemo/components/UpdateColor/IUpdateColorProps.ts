import { IColor } from "../../../../Interfaces/IColor";
import { IColorService } from "../../../../Services/IColorService";

export type UpdateColorCallback = (color: IColor) => void;

export interface IUpdateColorProps {
    onUpdateColor: UpdateColorCallback;
    color: IColor;
    colorService: IColorService;
}