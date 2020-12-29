import { IColorListService } from "./IColorListService";
import { IColor } from "../Interfaces/IColor";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ListBase } from "./ListBase";

export class ColorListService extends ListBase<IColor> implements IColorListService {

  constructor(spHttpClient: SPHttpClient, currentSiteUrl: string) {
    super(spHttpClient, currentSiteUrl, 'Colors', ['Id', 'Title']);
  }

  public getColors(): Promise<IColor[]> {
    return new Promise<IColor[]>((resolve, reject) => {
      this.getItems()
        .then((result: IColor[]) => {
          resolve(result);
          return result;
        })
        .catch(err => console.error('error to getColors: ', err));
    });
  }

  public addColor(colorName: string): Promise<IColor> {
    return new Promise<IColor>((resolve, reject) => {
      this.addItem({ Title: colorName, Id: 0 })
        .then((result: IColor) => {
          resolve(result);
          return result;
        })
        .catch(err => console.error('error to addColor: ', err));
    });

  }

  public updateColor(color: IColor): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getItem(color.Id)
        .then((oldColor: IColor) => {
          oldColor.Title = color.Title;
          this.updateItem(oldColor, color.Id)
            .then((result: boolean) => {
              resolve(result);
              return result;
            });
        });
    });
  }

  public deleteColor(id: number): void {
    this.deleteItem(id);
  }

  public hasColor(colorName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getItemByName(colorName)
        .then((color: IColor) => {
          if(color != undefined && color.Title.toLowerCase() === colorName.toLowerCase())
          {
            resolve(true);
            return true;
          }
          else
          {
            resolve(false);
            return false;
          }
        });
    });
  }
}