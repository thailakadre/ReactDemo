import { IColorService } from "./IColorService";
import { IColor } from "../Interfaces/IColor";

export class ColorServiceMock implements IColorService {
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
        return new Promise<IColor[]>((resolve) => {
            resolve(this.items);
            return this.items;
        });
    }

    public addColor(colorName: string): Promise<IColor> {
        return new Promise<IColor>((resolve) => {

            let color: IColor = {
                Title: colorName,
                Id: this.items[this.items.length - 1].Id + 1
            };

            this.items.push(color);
            resolve(color);
            return color;
        });

    }

    public updateColor(color: IColor): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let item = this.items.find(item => item.Id === color.Id);
            item.Title = color.Title;
            resolve(true);
            return true;
        });
    }

    public deleteColor(id: number): void {
        let newItems = this.items.filter(item => item.Id != id);
        this.items = newItems;
    }

    public hasColor(colorName: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            let result: boolean; 
            if (this.items.find(item => item.Title == colorName) != undefined)
                result = false;
            else
                result = true;

            resolve(result);
            return result;
        });
    }
}