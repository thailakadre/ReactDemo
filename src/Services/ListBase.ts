import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export class ListBase<T> {

    private listName: string;
    private fields: string[];
    private spHttpClient: SPHttpClient;
    private currentSiteUrl: string;

    constructor(spHttpClient: SPHttpClient, currentSiteUrl: string, listName: string, fields: string[]) {
        this.spHttpClient = spHttpClient;
        this.currentSiteUrl = currentSiteUrl;
        this.listName = listName;
        this.fields = fields;
    }

    public getItems(): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            const endpoint: string = `${this.currentSiteUrl}/_api/lists/getbytitle('${this.listName}')/items?$select=${this.fields.join(',')}`;
            this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    return response.json();
                })
                .then((jsonResponse: any) => {
                    let spListItem: T[] = [];
                    for (let index = 0; index < jsonResponse.value.length; index++) {
                        spListItem.push(jsonResponse.value[index]);
                        resolve(spListItem);
                    }
                })
                .catch(err => {
                    console.error('getItems: ', err);
                    console.error(`Error to get items on the ${this.listName} list.`);
                    reject(err);
                });
        });
    }

    public getItem(id: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const endpoint: string = `${this.currentSiteUrl}/_api/lists/getbytitle('${this.listName}')/items(${id})?$select=${this.fields.join(',')}`;
            this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata.metadata=minimal'
                }
            })
                .then((response: SPHttpClientResponse) => {
                    return response.json();
                })
                .then((jsonResponse: any) => {
                    resolve(jsonResponse);
                })
                .catch(err => {
                    console.error('getItem: ', err);
                    console.error(`Error to get item (id: ${id}) on the ${this.listName} list.`);
                    reject(err);
                });
        });
    }

    public getItemByName(colorName: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const endpoint: string = `${this.currentSiteUrl}/_api/lists/getbytitle('${this.listName}')/items?$filter=Title eq '${encodeURIComponent(colorName)}'&top=1&$select=${this.fields.join(',')}`;
            this.spHttpClient.get(endpoint, SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata.metadata=minimal'
                }
            })
                .then((response: SPHttpClientResponse) => {
                    return response.json();
                })
                .then((jsonResponse: any) => {
                    if (jsonResponse.value.length > 0)
                        resolve(jsonResponse.value[0]);
                    else
                        resolve(undefined);
                })
                .catch(err => {
                    console.error('getItem: ', err);
                    console.error(`Error to get item by name (title: ${colorName}) on the ${this.listName} list.`);
                    reject(err);
                });
        });
    }

    public addItem(item: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const endpoint: string = `${this.currentSiteUrl}/_api/lists/getbytitle('${this.listName}')/items`;
            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=nometadata',
                    'odata-version': ''
                },
                body: JSON.stringify(item)
            })
                .then((response: SPHttpClientResponse) => {
                    return response.json();
                })
                .then((itemResult: T) => {
                    resolve(itemResult);
                    return itemResult;
                })
                .catch(err => {
                    console.error('addItem: ', err);
                    console.error(`Error to add the item ${item} on the ${this.listName} list.`);
                    reject(err);
                });
        });
    }

    public updateItem(item: T, id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const endpoint: string = `${this.currentSiteUrl}/_api/lists/getbytitle('${this.listName}')/items(${id})`;

            const request: any = {};
            request.headers = {
                'X-HTTP-Method': 'MERGE',
                'IF-MATCH': (item as any)['@odata.etag']
            };
            request.body = JSON.stringify(item);

            this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, request)
                .then((response: SPHttpClientResponse) => {
                    resolve(true);
                    return true;
                })
                .catch(err => {
                    console.error('updateItem: ', err);
                    console.error(`Error to update the item ${id} on the ${this.listName} list.`);
                    reject(err);
                });
        });
    }

    public deleteItem(id: number) {
        const endpoint: string = `${this.currentSiteUrl}/_api/lists/getbytitle('${this.listName}')/items(${id})`;
        this.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=nometadata',
                'odata-version': '',
                'IF-MATCH': '*',
                'X-HTTP-Method': 'DELETE'
            }
        })
            .catch(err => {
                console.error('deleteItem: ', err);
                throw new Error(`Error to detele the item ${id} on the ${this.listName} list.`);
            });
    }

}