import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import { ISPService } from "./ISPService";

export class SPService implements ISPService {

    constructor(context: WebPartContext) {
        sp.setup({
            spfxContext: context
        });
    }

    public getLists(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let result: string[] = [];
            sp.web.lists.select("Title").orderBy("Title")()
                .then((allItems: any[]) => {
                    allItems.forEach(item => {
                        result.push(item.Title);
                    });
                    resolve(result);
                    return result;
                });
        });
    }

}