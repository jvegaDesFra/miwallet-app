import { Component } from '@angular/core';
import { Folders } from '../app/akita/models/folders.model';
import { FoldersQuery } from '../app/akita//query/folders.query';
import { FoldersService } from '../app/akita//service/folders.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  folders$: Observable<Folders[]>;
  constructor(private service : FoldersService,
    private query: FoldersQuery) {}

  trackByFn(index, param) {
    return param.id;
  }

  ngOnInit() {
    this.folders$ = this.query.getFolders$;
    
    

   this.service.add("Nuev carpetaa","#b71c1c")
   
  }
}
