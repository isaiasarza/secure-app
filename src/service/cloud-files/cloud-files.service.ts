export abstract class CloudFilesService{
    public abstract uploadFile(path: string, name: string, file: Blob): Promise<any>;
}