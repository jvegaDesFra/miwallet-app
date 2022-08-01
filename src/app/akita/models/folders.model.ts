import { guid } from '@datorama/akita';

export type Folders = {
  id?: string;
  name?: string;
  color?: string;
};

export function create(name: string, color: string, id: string) {
  return {
    id: id == "" ? guid(): id,
    name,
    color: color
  } as Folders;
}