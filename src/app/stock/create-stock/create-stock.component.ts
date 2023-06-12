import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Stock } from '../../model/stock';

let counter = 1;

/** NO CHANGE IN COMPONENT DECORATOR **/
export class CreateStockComponent {
  private stock: Stock;
  public stockForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10, 'NYSE');
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: [null, Validators.required],
      code: [null, [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  loadStockFromServer() {
    this.stock = new Stock('Test ' + counter++, 'TST', 20, 10, 'NYSE');
    let stockFormModel = Object.assign({}, this.stock);
    delete stockFormModel.previousPrice;
    delete stockFormModel.favorite;
    delete stockFormModel.exchange;
    this.stockForm.setValue(stockFormModel);
  }

  patchStockForm() {
    this.stock = new Stock(`Test ${counter++}`, 'TST', 20, 10, 'NYSE');
    this.stockForm.patchValue(this.stock);
  }

  resetForm() {
    this.stockForm.reset();
  }

  onSubmit() {
    this.stock = Object.assign({}, this.stockForm.value);
    console.log('Saving stock', this.stock);
  }
}
