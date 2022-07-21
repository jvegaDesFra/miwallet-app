import { guid } from '@datorama/akita';

export type Documentos = {
  id: string;
  title: string;
  file: string;
  completed: boolean;
};

export function createDocument(title: string) {
  return {
    id: guid(),
    title,
    file: '',
    completed: false
  } as Documentos;
}