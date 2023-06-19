import { Component, OnInit, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { INode } from './node.model';

@Component({
  selector: 'fsm-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss']
})
export class NodesComponent implements OnInit, AfterViewInit {
  @Input('node') node!: INode;
  @Output('remove') remove: EventEmitter<any> = new EventEmitter();
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;
  constructor() { }

  ngOnInit(): void { }

  // return icon src based on type
  getTypeIcon(type: 'folder' | 'file' | 'unset' | null) {
    switch (type) {
      case 'file':
        return 'assets/images/file-regular.svg';
      case 'folder':
        return 'assets/images/folder-open-regular.svg';
      default:
        return '';
    }
  }

  // set input filed auto focus
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.input && this.input.nativeElement) {
        this.input.nativeElement.focus();
      }
    }, 100);
  }

  //TODO: move below actions functions to a service

  /**
  * Add a child node
  * @returns {void}
  */
  addNode(): void {
    // prevent user keep adding nodes without type and name (and I know this logic is not working)
    if (this.node?.children && this.node.children.every(child => child.type === 'unset')) {
      return;
    }

    const newChild: INode = {
      id: new Date().getTime().toString(), //just using an unique value here, could be uuid
      type: 'unset'
    };

    const newChildren = this.node.children ? [...this.node.children, newChild] : [newChild];

    const newNode: INode = {
      ...this.node,
      children: newChildren
    };

    this.node = newNode;
  }

  /**
   * Sets the type of a node when the user clicks on a folder or file button.
   * @param {'folder' | 'file'} type - The type of the node ('folder' or 'file').
   * @returns {void}
   */
  setNodeType(type: "folder" | "file"): void {
    this.node.type = type;

    setTimeout(() => {
      this.inputFocusAfterSetNodeType();
    }, 100);
  }

  /**
   * Set the name of a node provided by a user.
   * @param {string} name - The new name for the node.
   * @returns {void}
   */
  setNodeName(name: string): void {
    if (name && name.trim()) {
      this.node.name = name.trim();
    }
  }

  /**
   * Emits an event to remove a node when the user clicks on the delete icon.
   * @returns {void}
   */
  deleteNode(): void {
    this.remove.emit(this.node.id);
  }

  /**
   * Removes a node from the children array based on the provided id.
   * @param {string} id - The id of the node to be removed.
   * @returns {void}
   */
  deleteChildNode(id: string): void {
    const updatedChildren = this.node.children ? this.node.children.filter((child) => child.id !== id) : [];

    if (updatedChildren.length !== this.node.children?.length) {
      const newNode = {
        ...this.node,
        children: updatedChildren
      };
      this.node = newNode;
    }
  }

  // Set focus on input field
  private inputFocusAfterSetNodeType(): void {
    if (this.input && this.input.nativeElement) {
      this.input.nativeElement.focus();
    }
  }

}
