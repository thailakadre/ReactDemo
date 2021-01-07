import { IColorListService } from "./IColorListService";
import { IColor } from "../Interfaces/IColor";

export class ColorListServiceMock implements IColorListService {
    private items: IColor[] = [
        {
            Id: 1,
            Title: 'Pink'
        },
        {
            Id: 2,
            Title: 'Gold'
        },
        {
            Id: 3,
            Title: 'Gray'
        },
    ];

    public getColors(): Promise<IColor[]> {
        return new Promise<IColor[]>((resolve, reject) => {
            resolve(this.items);
            return this.items;
        });
    }

    public addColor(colorName: string): Promise<IColor> {
        return new Promise<IColor>((resolve, reject) => {
            let color: IColor = {
                Title: colorName,
                Id: 4
            };

            resolve(color);
            return color;
        });

    }

    public updateColor(color: IColor): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
            return true;
        });
    }

    public deleteColor(id: number): void {

    }

    public hasColor(colorName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
            return true;
        });
    }
}