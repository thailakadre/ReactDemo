import * as React from "react";
import { IUpdateColorProps } from "./IUpdateColorProps";
import { IUpdateColorState } from "./IUpdateColorState";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { ActionButton } from "office-ui-fabric-react/lib/Button";
import styles from "./UpdateColor.module.scss";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

export class UpdateColor extends React.Component<IUpdateColorProps, IUpdateColorState>{
    
    private UpdateIcon: IIconProps =
        {
            iconName: 'Save',
            styles: {
                root: {
                    fontSize: 30,
                    height: 30,
                    width: 30,
                    marginLeft: -20,
                    marginTop: 10
                }
            }
        };

    constructor(props: IUpdateColorProps) {
        super(props);
        this.state = { newColorName: '', isEmpty: false, isError: false };

        this._onTextFieldChange = this._onTextFieldChange.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
    }

    public render(): React.ReactElement<IUpdateColorProps> {
        return (
            <div className={styles.updateColor}>
                 {this.state.isError === true &&
                    <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                        {this.state.newColorName} already exist on the list.
                    </MessageBar>}
                {this.state.isEmpty === true &&
                    <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                        The color can not be empty.
                    </MessageBar>}
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.columnTextField}>
                            <TextField label='Update' value={this.state.newColorName} onChange={this._onTextFieldChange} onKeyPress={this._onKeyPress} />
                        </div>
                        <div className={styles.columnButton}>
                            <ActionButton iconProps={this.UpdateIcon} onClick={() => this._onButtonClick()} ></ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private _onButtonClick(): void {
        if (this.state.newColorName != '') {
            this.props.colorService.hasColor(this.state.newColorName)
                .then((hasColor: Boolean) => {
                    if (!hasColor) {
                        let color = this.props.color;
                        color.Title = this.state.newColorName;
                        this.props.onUpdateColor(color);
                        this.setState({newColorName: '', isError: false, isEmpty: false});
                    }
                    else {
                        this.setState({ isError: true, isEmpty: false });
                    }
                });
        }
        else {
            this.setState({ isError: false, isEmpty: true });
        }
    }

    private _onTextFieldChange(event) {
        this.setState({ newColorName: event.target.value, isError: false, isEmpty: false });
    }

    private _onKeyPress = e => {
        if (e.charCode == 13) {
            this._onButtonClick();
        }
    }
}
