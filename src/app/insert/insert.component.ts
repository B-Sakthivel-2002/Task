import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { business, depot, equipment, transport } from '../interface';
import { DepoService } from '../depo.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})

export class InsertComponent implements OnInit{

  ngOnInit(): void {
    this.loadOptions();
  }
  loadOptions(){
    this.a.loadDepot().subscribe(data => {
      this.depotidOptions = data;
  
   });
   this.a.loadbusinesspartner().subscribe(data => {
    this.linerOptions = data;

 });
  }
  equipment:equipment={
    // equipmentId: 0,
    equipmentNo: '',
    equipmentSize: undefined,
    equipmentLinerId: '',
    depotId: '',
    conTrackingNo: '',
    gateInDateTime: '',
    ReferenceNo: ''
  }
 transport:transport={
  //  transportId: 0,
   transportCompany: '',
   licenseNo: '',
   driverName: '',
   driverMobileNo: undefined,
   driverEmail: ''
 }
 
 linerOptions:any;

 depotidOptions:any;


  onSubmit() {
 if(this.mainFormGroup.valid){
  this.insertEquipment();
this.inserttransport();
 }
 else{
  alert("error");
 }

  }
  mainFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,private a:DepoService,private router:Router,private http: HttpClient) {
    this.mainFormGroup = this.formBuilder.group({
      equipment: this.formBuilder.group({
        // equipmentId: ['', Validators.required],
        equipmentNo: ['', Validators.required],
        equipmentSize: ['', Validators.required],
        equipmentLinerId: ['', Validators.required],
        depotId: ['', Validators.required],
        conTrackingNo: ['', Validators.required],
        gateInDateTime: ['', Validators.required],
        ReferenceNo: ['', Validators.required]
      }),
      transport: this.formBuilder.group({
        // transportId: ['', [Validators.required]],
        transportCompany: ['', [Validators.required]],
        licenseNo: ['', [Validators.required]],
        driverName: ['', [Validators.required]],
        driverMobileNo: ['', [Validators.required]],
        driverEmail: ['', [Validators.required]]
     }),

    });
  }
  insertEquipment(){
    console.log(this.equipment);
    this.a.addEquipment(this.equipment)
    .subscribe({
      next:()=>
      {
        // alert("added");
      },
      error:(response)=>
      {
        console.log(response);
      }
    })
  }
   inserttransport(){
    this.a.addTransport(this.transport)
    .subscribe({
      
      next:()=>
      {
        console.log(this.transport);
        // alert("Transport added successfully");
        this.router.navigate(['']);
      },
      error:(response)=>
      {
        alert("error in trans");
        console.log(response);
      }
    })
   }

// print(){
  // const printContent = document.querySelector('.print-content');

  // if (printContent ) {
  //   const originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContent.innerHTML;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // } else {
  //   console.error('Print content not found.');
  // }
  
    // Make a GET request to the server's /print endpoint
   
// }
print() {
  // Make a GET request to the server's /print endpoint
  this.http.get('http://localhost:4000/print', { responseType: 'text' }).subscribe(
    response => {
      console.log('Print request sent successfully');
    },
    error => {
      console.error('Error sending print request:', error);
    }
  );
}

}
   


