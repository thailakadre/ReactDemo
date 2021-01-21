import { ISPService } from "./ISPService";

export class SPServiceMock implements ISPService {

    public getLists(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            let result: string[] = ["List 1", "List 2", "List 3"];
            resolve(result);
            return result;
        });
    }

}