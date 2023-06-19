export interface INode
 {
  type: 'folder' | 'file' | 'unset' | null;
  name?: string;
  children?: INode[];
  id: string;
 }
