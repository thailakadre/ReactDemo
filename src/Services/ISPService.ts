export interface ISPService{
    getLists(): Promise<string[]>;
}