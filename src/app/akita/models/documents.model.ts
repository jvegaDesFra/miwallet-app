import { guid } from '@datorama/akita';

export type Documentos = {
  id: string;
  title: string;
  file: string;
  completed: boolean;
  idFolder: string
};

export function createDocument(title: string, idFolder: string, file: string) {
  return {
    id: guid(),
    title,
    file: file,
    completed: false,
    idFolder: idFolder
  } as Documentos;
}

export class file {
  type?:string;
  name?:string;
  size?: number;
  blob?: any;
}