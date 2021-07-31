import { storage } from '../../firebaseConfig';
import { CloudFilesService } from './cloud-files.service';
export class CloudFilesFirebaseImpService extends CloudFilesService{

    public uploadFile(path: string, name: string, file: Blob): Promise<any>{
        const imgRef = storage.ref().child(path + "/" + name)
        return imgRef.put(file)
        .then((snap) => Promise.resolve(snap))
        .catch((reason) => Promise.reject(reason))
    }
}