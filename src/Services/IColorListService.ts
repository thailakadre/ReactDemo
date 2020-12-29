import { IColor } from "../Interfaces/IColor";

export interface IColorListService {

    getColors(): Promise<IColor[]>;
    addColor(colorName: string): Promise<IColor>;
    updateColor(color: IColor): Promise<boolean>;
    deleteColor(id: number): void;
    hasColor(colorName: string): Promise<boolean>;
}