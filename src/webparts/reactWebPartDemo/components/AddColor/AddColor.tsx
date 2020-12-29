import * as React from "react";
import { IAddColorProps } from "./IAddColorProps";
import { IAddColorState } from "./IAddColorState";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import styles from "./AddColor.module.scss";
import { IColorListService } from "../../../../Services/IColorListService";
import { ColorListService } from "../../../../Services/ColorListService";

export class AddColor extends React.Component<IAddColorProps, IAddColorState> {
    private colorListService: IColorListService;

    constructor(props: IAddColorProps) {
        super(props);
        this.state = { colorName: '', isError: false, isSuccess: false, colorNameAdded: '', isEmpty: false };

        this._onTextFieldChange = this._onTextFieldChange.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
        this.colorListService = new ColorListService(this.props.spHttpClient, this.props.currentSiteUrl);
    }

    public render(): React.ReactElement<IAddColorProps> {
        return (
            <div className={styles.addColor}>
                {this.state.isError === true &&
                    <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                        {this.state.colorName} already exist on the list.
                    </MessageBar>}
                {this.state.isEmpty === true &&
                    <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                        The color can not be empty.
                    </MessageBar>}
                {this.state.isSuccess === true &&
                    <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
                        {this.state.colorNameAdded} was added.
                    </MessageBar>}
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.columnTextField}>
                            <TextField label='New Color' value={this.state.colorName} onChange={this._onTextFieldChange} onKeyPress={this._onKeyPress} />
                        </div>
                        <div className={styles.columnButton}>
                            <PrimaryButton text='Add' onClick={() => this._onButtonClick()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private _onButtonClick(): void {
        if (this.state.colorName != '') {
            this.colorListService.hasColor(this.state.colorName)
                .then((hasColor: Boolean) => {
                    if (!hasColor) {
                        this.props.onAddColor(this.state.colorName);
                        const colorNameAdded = this.state.colorName;
                        this.setState({ colorName: '', isError: false, isSuccess: true, colorNameAdded: colorNameAdded, isEmpty: false });
                    }
                    else {
                        this.setState({ isError: true, isSuccess: false, isEmpty: false });
                    }
                });
        }
        else {
            this.setState({ isError: false, isSuccess: false, isEmpty: true });
        }
    }

    private _onTextFieldChange(event) {
        this.setState({ colorName: event.target.value, isError: false, isSuccess: false, isEmpty: false });
    }

    private _onKeyPress = e => {
        if (e.charCode == 13) {
            this._onButtonClick();
        }
    }
}