import { guid } from '@datorama/akita';

export type Documentos = {
  id: string;
  title: string;
  file: file;
  completed: boolean;
  idFolder: string;
  filePath: string;
};

export function createDocument(title: string, idFolder: string, file: file, filePath: string, folderColor: string, id: string) {
  return {
    id: id == "" ? guid() : id,
    title,
    file: file,
    filePath: filePath,
    completed: false,
    idFolder: idFolder,
    folderColor: folderColor
  } as Documentos;
}

export class file {
  type?:string;
  name?:string;
  size?: number;
  blob?: any;
}