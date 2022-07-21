import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Documentos } from '../../../akita/models/documents.model';

@Component({
  selector: 'app-todos',
  template: `
    <div class="collection with-header">
      <h4 class="collection-header">Todos:</h4>
      <app-todo *ngFor="let todo of todos; trackBy: trackByFn"
                class="collection-item"
                (delete)="delete.emit($event)"
                (complete)="complete.emit($event)"
                [todo]="todo"></app-todo>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
  @Input() todos: Documentos[];
  @Output() complete = new EventEmitter<Documentos>();
  @Output() delete = new EventEmitter<string>();

  trackByFn(index, todo) {
    return todo.id;
  }
}
