import { guid } from '@datorama/akita';

export type Folders = {
  id: string;
  name: string;
  color: string;
};

export function create(name: string, color: string) {
  return {
    id: guid(),
    name,
    color: color
  } as Folders;
}