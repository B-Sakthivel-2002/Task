import { Component, OnInit } from '@angular/core';
import { DepoService } from '../depo.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  constructor(private a:DepoService){}
  mergedData: any;

  ngOnInit(): void {
    this.a.getMergedDetails().subscribe(data => {
      this.mergedData = data;
      console.log(this.mergedData);
    });
  }
  print(item: any) {
  const pdf = new jspdf.jsPDF();
  const margin = 15; 
  const contentWidth = pdf.internal.pageSize.getWidth() - 2 * margin; 
  const contentHeight = pdf.internal.pageSize.getHeight() - 2 * margin-20; 
  let yPos = margin; 
  yPos += 10;
  pdf.rect(margin, margin, contentWidth, contentHeight); 
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(28, 68, 95); 
  pdf.text('iDepo Details', 80, yPos);
  yPos += 20;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  const keys = Object.keys(item);
    for (const key of keys) {
      const value = item[key];
      if (key === 'gateInDateTime') {

        const dateTime = new Date(value);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();

        pdf.setTextColor(28, 68, 95); 
        pdf.text(`Date:`, 20, yPos+10);
        pdf.setTextColor(0, 0, 0); 
        pdf.text(`${date}`,  70, yPos+10);
        pdf.setTextColor(28, 68, 95); 
        pdf.text(`Time:`, 20, yPos);
        pdf.setTextColor(0, 0, 0); 
        pdf.text(`${time}`,  70, yPos);

        yPos += 20;
      }
      else{
      pdf.setTextColor(28, 68, 95); 
      pdf.text(`${key}:`, 20, yPos);

      pdf.setTextColor(0, 0, 0); 
      pdf.text(`${value}`, 70, yPos);
      yPos += 10;
      }}
    yPos += 5; 


  pdf.autoPrint(); 
  const blob = pdf.output('blob'); 
  const url = URL.createObjectURL(blob);
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  iframe.contentWindow?.print(); 
  }

}

