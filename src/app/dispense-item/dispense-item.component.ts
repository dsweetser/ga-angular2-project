import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item/item.service';
import { BalanceService } from '../balance/balance.service'

@Component({
  selector: 'app-dispense-item',
  templateUrl: './dispense-item.component.html',
  styleUrls: ['./dispense-item.component.css']
})
export class DispenseItemComponent implements OnInit {
  public currentBalance = 0
  public selectedItem
  constructor(public itemService: ItemService, public balanceService: BalanceService) { }

  ngOnInit() {
  }

  onDispenseItem() {
    this.currentBalance = this.balanceService.getBalance();
    this.selectedItem = this.itemService.getSelectedItem();
    if ((this.itemService.hasSufficientBalance(this.currentBalance)) && (this.selectedItem.remaining > 0)) {
      this.itemService.dispenseItem(this.selectedItem);
      this.balanceService.deductBalance(this.selectedItem.cost);
    }
  }

}
