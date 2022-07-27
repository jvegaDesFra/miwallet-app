import { guid } from '@datorama/akita';

export type Documentos = {
  id: string;
  title: string;
  file: string;
  completed: boolean;
  idFolder: string
};

export function createDocument(title: string, idFolder: string) {
  return {
    id: guid(),
    title,
    file: '',
    completed: false,
    idFolder: idFolder
  } as Documentos;
}