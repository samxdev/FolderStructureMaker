import { Component, OnInit } from '@angular/core';
import { INode } from '../nodes/node.model';

@Component({
  selector: 'fsm-folder-structure',
  templateUrl: './folder-structure.component.html',
  styleUrls: ['./folder-structure.component.scss']
})
export class FolderStructureComponent implements OnInit {
  nodes: INode[] = [];
  constructor() { }
  ngOnInit(): void {}

// TODO: Could refactor below two functions and move to node servce
// Adding a root folder when user clicks on 'Add folder to root' button
addRootFolder(): void {
  const newNode: INode = {
    id: (this.nodes.length + 1).toString(), 
    type: 'folder'
  };

  if (newNode.id && newNode.type && this.nodeHasValidName()) {
    this.nodes = [...this.nodes, newNode]; // Create a new array by spreading the existing nodes and adding the new node
  }
}

// only enable creating a folder with name at once
private nodeHasValidName(): boolean {
  return this.nodes.length > 0 ? this.nodes.every(node => node.name && node.name.trim()) : true;
}

/**
 * Remove root folder
 * @param id Id of node
 */
removeRootFolder(id: string): void {
  const removedIndex = this.nodes.findIndex(node => node.id === id);

  if (removedIndex !== -1) {
    const updatedNodes = [
      ...this.nodes.slice(0, removedIndex),
      ...this.nodes.slice(removedIndex + 1)
    ];

    // Rearrange the IDs of the remaining nodes
    const rearrangedNodes = updatedNodes.map((node, index) => ({
      ...node,
      id: (index + 1).toString()
    }));

    this.nodes = rearrangedNodes;
  }
}

}
