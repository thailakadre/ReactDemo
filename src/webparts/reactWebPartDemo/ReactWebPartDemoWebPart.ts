import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactWebPartDemoWebPartStrings';
import ReactWebPartDemo from './components/ReactWebPartDemo';
import { IReactWebPartDemoProps } from './components/IReactWebPartDemoProps';
import { ColorService } from '../../Services/ColorService';
import { ColorServiceMock } from '../../Services/ColorServiceMock';
import { ISPService } from '../../Services/ISPService';
import { SPService } from '../../Services/SPService';
import { SPServiceMock } from '../../Services/SPServiceMock';

export interface IReactWebPartDemoWebPartProps {
  description: string;
}

export default class ReactWebPartDemoWebPart extends BaseClientSideWebPart<IReactWebPartDemoWebPartProps> {
  private spService: ISPService;
  
  private listOptions: IPropertyPaneDropdownOption[];
  private listOptionsLoading: boolean = false;

  public render(): void {
    this.spService = Environment.type === EnvironmentType.SharePoint
      ? new SPService(this.context)
      : new SPServiceMock();

    const element: React.ReactElement<IReactWebPartDemoProps> = React.createElement(
      ReactWebPartDemo,
      {
        description: this.properties.description,
        colorService: Environment.type == EnvironmentType.SharePoint
        ? new ColorService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl)
        : new ColorServiceMock()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('listName', {
                  label: strings.ListNameFieldLabel,
                  options: this.listOptions,
                  disabled: this.listOptionsLoading
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneConfigurationStart(): void {
    this.getLists().then(listOptions => {
      this.listOptions = listOptions;
      this.context.propertyPane.refresh();
    });
  }

  private getLists(): Promise<IPropertyPaneDropdownOption[]> {
    this.listOptionsLoading = true;

    this.context.propertyPane.refresh();

    return this.spService.getLists().then(lists => {
      this.listOptionsLoading = false;
      this.context.propertyPane.refresh();
      return lists.map(list => {
        return {
          key: list,
          text: list
        };
      });
    });
  }
}
