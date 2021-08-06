import { storage } from '../../firebaseConfig';
import { CloudFilesService } from './cloud-files.service';
import firebase from 'firebase';
export class CloudFilesFirebaseImpService extends CloudFilesService{

    public uploadFile(path: string, name: string, file: Blob): Promise<any>{
        const imgRef = storage.ref().child(path + "/" + name)
        return imgRef.put(file)
        .then((snap) => Promise.resolve(snap))
        .catch((reason) => Promise.reject(reason))
    }

    public async getFiles(path: string){
        const items: firebase.storage.Reference[] = (await storage.ref(path).listAll()).items
        return Promise.resolve(items.map(async (item) => await item.getDownloadURL()))
    }
}