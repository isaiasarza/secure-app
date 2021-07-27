import { CloudFilesService } from './cloud-files.service';
export class CloudFilesTestImpService extends CloudFilesService{
    public uploadFile(path: string, name: string, file: any): Promise<void>{
        return Promise.resolve()
    }
}