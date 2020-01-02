import { Component, OnInit,TemplateRef,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  private apiUrl = '../../assets/products.json';
  items : any;
  totalqty:any;
  totalprice:any;
  modalRef: BsModalRef;

  constructor(private httpClient: HttpClient,private modalService: BsModalService){}
  openModal(Modal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(Modal,{ backdrop : 'static', keyboard : false });   
  
  }
  ngOnInit(){
    this.fetchData();
  }

  private fetchData(){
    this.httpClient.get( this.apiUrl).subscribe(res => {
      this.items = res;
      console.log(this.items);
    });
  }
 
  
  
  incrementQty(index:number){
      this.items[index].Quantity += 1;
  }
  decrementQty(index:number){
    /*. if item passed then item.qty. */
      if(this.items[index].Quantity-1 < 0){
        this.items[index].Quantity = 0;
        console.log('item_1-> ' + this.items[index].Quantity)
      }
      else{
        this.items[index].Quantity -= 1;
        console.log('item_2-> ' + index +  '  '+this.items[index].Quantity);
      }
      }

  calculation(i,quan:number,p:number){
    let total:number=0
    let price:number=0
   this.items[i].Total=(quan*p).toFixed(2)
    this.items.forEach(element => {
     // total=parseInt(total+element.total);
     total+=parseInt(element.Quantity)
     price+=parseFloat(element.Total)
    });
    this.totalqty=total;
    this.totalprice=price.toFixed(2)
  }

 
}





