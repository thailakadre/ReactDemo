import { SPHttpClient } from '@microsoft/sp-http';
import { IColorService } from '../../../Services/IColorService';

export interface IReactWebPartDemoProps {
  description: string;
  colorService: IColorService;
}
