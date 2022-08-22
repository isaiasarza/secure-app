import { Preferences as Storage } from '@capacitor/preferences';

export class AppLogger{
    async addLog(appLog: AppLog){
        const value = (await Storage.get({key: "app_log"})).value
        let logs = []
        if(value !== null){
            logs.push(...JSON.parse(value) as [])            
        }
        logs.push(appLog)
        Storage.set({key: "app_log",value:JSON.stringify(logs)})
    }
}

export interface AppLog{

}