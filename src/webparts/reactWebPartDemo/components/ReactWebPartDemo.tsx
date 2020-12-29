import * as React from 'react';
import { IReactWebPartDemoProps } from './IReactWebPartDemoProps';
import { IColor } from '../../../Interfaces/IColor';
import { ColorList } from './ColorList/ColorList';
import { IReactWebPartDemoState } from './IReactWebPartDemoState';
import { IColorListService } from '../../../Services/IColorListService';
import { ColorListService } from '../../../Services/ColorListService';
import { AddColor } from './AddColor/AddColor';
import styles from './ReactWebPartDemo.module.scss';

export default class ReactWebPartDemo extends React.Component<IReactWebPartDemoProps, IReactWebPartDemoState> {

  private colorListService: IColorListService;

  constructor(props: IReactWebPartDemoProps) {
    super(props);
    this.state = { colors: [] };
    this.colorListService = new ColorListService(this.props.spHttpClient, this.props.currentSiteUrl);
  }

  public componentDidMount(): void {
    this.getColorsList();
  }

  public render(): React.ReactElement<IReactWebPartDemoProps> {
    return (
      <div className={styles.reactWebPartDemo}>
        <div className={styles.titleDiv}><span>CRUD Demo with SharePoint + React!</span></div>
        <AddColor onAddColor={this._addColor} currentSiteUrl={this.props.currentSiteUrl} spHttpClient={this.props.spHttpClient} />
        <hr/>
        <ColorList colors={this.state.colors} onRemoveColor={this._removeColor} onUpdateColor={this._updateColor} currentSiteUrl={this.props.currentSiteUrl} spHttpClient={this.props.spHttpClient} />
      </div>
    );
  }

  private getColorsList(): void {
    this.colorListService.getColors()
      .then((spListItemColors: IColor[]) => {
        this.setState({ colors: spListItemColors });
      })
      .catch(err => console.error('componentDidMount - error: ', err));
  }

  private _removeColor = (colorToRemove: IColor): void => {
    const newColors = this.state.colors.filter(color => color != colorToRemove);
    this.colorListService.deleteColor(colorToRemove.Id);
    this.setState({ colors: newColors });
  }

  private _addColor = async (colorName: string): Promise<void> => {
    this.colorListService.addColor(colorName)
      .then((newColor: IColor) => {
        this.getColorsList();
      })
      .catch(err => console.error('_addColor - error: ', err));
  }

  private _updateColor = (colorToUpdate: IColor): void => {
    this.colorListService.updateColor(colorToUpdate)
      .then((result: boolean) => {
        this.getColorsList();
      });
  }

}
