import * as React from 'react';
import { IReactWebPartDemoProps } from './IReactWebPartDemoProps';
import { IColor } from '../../../Interfaces/IColor';
import { ColorList } from './ColorList/ColorList';
import { IReactWebPartDemoState } from './IReactWebPartDemoState';
import { AddColor } from './AddColor/AddColor';
import styles from './ReactWebPartDemo.module.scss';

export default class ReactWebPartDemo extends React.Component<IReactWebPartDemoProps, IReactWebPartDemoState> {

  constructor(props: IReactWebPartDemoProps) {
    super(props);
    this.state = { colors: [] };
  }

  public componentDidMount(): void {
    this.getColorsList();
  }

  public render(): React.ReactElement<IReactWebPartDemoProps> {
    return (
      <div className={styles.reactWebPartDemo}>
        <div className={styles.titleDiv}><span>CRUD Demo with SharePoint + React + Jest!</span></div>
        <AddColor colorListService={this.props.colorService}  onAddColor={this._addColor}/>
        <hr/>
        <ColorList colors={this.state.colors} onRemoveColor={this._removeColor} onUpdateColor={this._updateColor} colorService={this.props.colorService} />
      </div>
    );
  }

  private getColorsList(): void {
    this.props.colorService.getColors()
      .then((spListItemColors: IColor[]) => {
        this.setState({ colors: spListItemColors });
      })
      .catch(err => console.error('componentDidMount - error: ', err));
  }

  private _removeColor = (colorToRemove: IColor): void => {
    const newColors = this.state.colors.filter(color => color != colorToRemove);
    this.props.colorService.deleteColor(colorToRemove.Id);
    this.setState({ colors: newColors });
  }

  private _addColor = async (colorName: string): Promise<void> => {
    this.props.colorService.addColor(colorName)
      .then(() => {
        this.getColorsList();
      })
      .catch(err => console.error('_addColor - error: ', err));
  }

  private _updateColor = (colorToUpdate: IColor): void => {
    this.props.colorService.updateColor(colorToUpdate)
      .then(() => {
        this.getColorsList();
      });
  }

}
