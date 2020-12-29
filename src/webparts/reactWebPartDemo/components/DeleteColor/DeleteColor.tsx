import * as React from "react";
import { IDeleteColorProps } from "./IDeleteColorProps";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { IColor } from "../../../../Interfaces/IColor";
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import styles from "./DeleteColor.module.scss";

export class DeleteColor extends React.Component<IDeleteColorProps, {}>{
    private deleteIcon: IIconProps =
    {
        iconName: 'Delete',
        styles: {
            root: {
                fontSize: 30,
                height: 30,
                width: 30
            }
        }
    };

    constructor(props: IDeleteColorProps, { }) {
        super(props);
    }

    public render(): React.ReactElement<IDeleteColorProps> {
        return (
            <div className={styles.deleteColor}>
                <ActionButton iconProps={this.deleteIcon} data={this.props.color.Id} onClick={() => this._onButtonClick(this.props.color)} />
            </div>
        );
    }

    private _onButtonClick(color: IColor): void {
        this.props.onRemoveColor(color);
    }
}