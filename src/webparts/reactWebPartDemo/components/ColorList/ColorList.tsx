import * as React from 'react';
import { IColor } from '../../../../Interfaces/IColor';
import { IColorListProps } from './IColorListProps';
import { DeleteColor } from '../DeleteColor/DeleteColor';
import { UpdateColor } from '../UpdateColor/UpdateColor';
import styles from './ColorList.module.scss';

export class ColorList extends React.Component<IColorListProps, {}> {
   
    constructor(props: IColorListProps, { }) {
        super(props);
    }

    public render(): React.ReactElement<IColorListProps> {
        return (
            <div className={styles.colorList}>
                {this.props.colors.map((color) => {
                    return (
                        <div className={styles.container} style={{backgroundColor:color.Title}}>
                            <div className={styles.title}>{color.Title}</div>
                            <UpdateColor color={color} onUpdateColor={(updateColor) => this._onUpdateClick(updateColor)}  colorService={this.props.colorService} />
                            <DeleteColor color={color} onRemoveColor={() => this._onDeleteClick(color)}></DeleteColor>
                        </div>
                    );
                })}
            </div>
        );
    }

    private _onUpdateClick(color: IColor): void {
        this.props.onUpdateColor(color);
    }

    private _onDeleteClick(color: IColor): void {
        this.props.onRemoveColor(color);
    }
}