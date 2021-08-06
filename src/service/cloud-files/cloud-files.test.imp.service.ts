import { CloudFilesService } from './cloud-files.service';
export class CloudFilesTestImpService extends CloudFilesService{
    public uploadFile(path: string, name: string, file: Blob): Promise<void>{
        return Promise.resolve()
    }

    public getFiles(path: string){
        return Promise.resolve([])
    }
}