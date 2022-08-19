import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UIService } from '../../../../services/ui.service';
import { Folders } from '../../../../akita/models/folders.model';
import { FoldersService } from '../../../../akita/service/folders.service';
import { CategoriesServices } from '../../categories.services';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-folder-new',
  templateUrl: './folder-new.component.html',
  styleUrls: ['./folder-new.component.scss'],
})
export class FolderNewComponent implements OnInit {
  nombre: string = "";
  color: string = "";
  colors = [
    {
      id: 1,
      name: "azul",
      rgb: "rgb(183, 28, 28)",
      hexa: "#b71c1c"
    },
    {
      id: 2,
      name: "rojo",
      rgb: "rgb(74, 20, 140)",
      hexa: "#4a148c"
    },
    {
      id: 3,
      name: "verde",
      rgb: "rgb(49, 27, 146)",
      hexa: "#311b92"
    },
    {
      id: 4,
      name: "aasd",
      rgb: "rgb(13, 71, 161)",
      hexa: "#0d47a1"
    },
    {
      id:5,
      name: "aasd",
      rgb: "rgb(83, 116, 166)",
      hexa: "#5374a6"
    },
    {
      id: 6,
      name: "aasd",
      rgb: "rgb(0, 77, 64)",
      hexa: "#004d40"
    },
    {
      id: 7,
      name: "aasd",
      rgb: "rgb(27, 94, 32)",
      hexa: "#1b5e20"
    },
    {
      id: 8,
      name: "aasd",
      rgb: "rgb(130, 119, 23)",
      hexa: "#827717"
    },
    {
      id: 9,
      name: "aasd",
      rgb: "rgb(245, 127, 23)",
      hexa: "#f57f17"
    },
    {
      id: 10,
      name: "aasd",
      rgb: "rgb(62, 39, 35)",
      hexa: "#3e2723"
    },
    {
      id: 11,
      name: "aasd",
      rgb: "rgb(76, 59, 56)",
      hexa: "#4c3b38"
    },
    {
      id: 12,
      name: "aasd",
      rgb: "rgb(211, 47, 47)",
      hexa: "#d32f2f"
    },
    {
      id: 13,
      name: "aasd",
      rgb: "rgb(49, 27, 146)",
      hexa: "#311b92"
    },
    {
      id: 14,
      name: "aasd",
      rgb: "rgb(81, 45, 168)",
      hexa: "#512da8"
    },
    {
      id: 15,
      name: "aasd",
      rgb: "rgb(43, 24, 128)",
      hexa: "#2b1880"
    },
    {
      id: 16,
      name: "aasd",
      rgb: "rgb(2, 136, 209)",
      hexa: "#0288d1"
    },
    {
      id: 17,
      name: "aasd",
      rgb: "rgb(191, 215, 212)",
      hexa: "#bfd7d4"
    },
    {
      id: 18,
      name: "aasd",
      rgb: "rgb(56, 142, 60)",
      hexa: "#388e3c"
    },
    {
      id: 19,
      name: "aasd",
      rgb: "rgb(175, 180, 43)",
      hexa: "#afb42b"
    },
    {
      id: 20,
      name: "aasd",
      rgb: "rgb(251, 192, 45)",
      hexa: "#fbc02d"
    },
    {
      id: 21,
      name: "aasd",
      rgb: "rgb(162, 149, 144)",
      hexa: "#a29590"
    },
    {
      id: 22,
      name: "aasd",
      rgb: "rgb(97, 97, 97)",
      hexa: "#616161"
    }
  ];
  constructor(private modalController: ModalController,
    private service : FoldersService,
    private ui: UIService,
    private catService: CategoriesServices,
    private authService: AuthenticationService) { }

  
  ngOnInit() {
   // this.ui.presentToast("Se ha guardado la categoria", "success")
  }
  save(){
    //console.log(this.selectedColor);
    //console.log(this.nombre);
    this.ui.loader("").then(loader=>{
      loader.present();
      let color = this.selectedColor ? this.selectedColor.hexa : "";
 


      this.catService
      .add(this.nombre, color, this.authService.currentOwnerValue.id)
      .pipe(first())
      .subscribe({
        next: (res) => {   
          //console.log(res);
          this.service.add(this.nombre,color , res.id);
          loader.dismiss();
          this.ui.presentToast("Se ha guardado la categoria", "green", 'checkmark-circle');
          this.CloseModal(null);
        },
        error: (error) => {
          
        },
      });

      
    })
    
    
  }
  selectedColor;
  setColor(color){
  
    this.selectedColor = color;
  }
  CloseModal(return_) {
  
    this.modalController.dismiss(return_);
  }
}
