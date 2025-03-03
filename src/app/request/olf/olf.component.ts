import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olf',
  standalone: false,
  templateUrl: './olf.component.html',
  styleUrls: ['./olf.component.css']
})
export class OlfComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.employeeForm = this.fb.group({
      name: [''],
      location: [''],
      offerDate: [''],
      companyName: [''],
      companyAddress: [''],
      designation: [''],
      officeTiming: [''],
      joiningDate: [''],
      acceptanceDate: [''],
      managingDirector: [''],
      level: [''],
      basic: [],
      hra: [],
      pf: [],
      flexiBenefits: [],
      grossMonthly: [''],
      annualizedGross: [''],
      performanceIncentive: [],
      annualGross: [''],
      totalWelfare: [5000], // Fixed value
      ctcBeforeGratuity: [''],
      gratuity: [],
      ctc: ['']
    });
  }

  ngOnInit(): void {
    // ✅ Automatically update totals when form values change
    this.employeeForm.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    // Ensure all values are treated as numbers
    const basic = Number(this.employeeForm.get('basic')?.value) || 0;
    const hra = Number(this.employeeForm.get('hra')?.value) || 0;
    const pf = Number(this.employeeForm.get('pf')?.value) || 0;
    const flexi = Number(this.employeeForm.get('flexiBenefits')?.value) || 0;
    const incentive = Number(this.employeeForm.get('performanceIncentive')?.value) || 0;
    const gratuity = Number(this.employeeForm.get('gratuity')?.value) || 0;
    const totalWelfare = 5000; // Fixed value

    // Calculate totals
    const grossMonthly = basic + hra + pf + flexi;
    const annualizedGross = grossMonthly * 12;
    const annualGross = annualizedGross + incentive;
    const ctcBeforeGratuity = annualGross + totalWelfare;
    const totalCTC = ctcBeforeGratuity + gratuity;

    // ✅ Ensure form fields update correctly
    this.employeeForm.patchValue({
      grossMonthly: grossMonthly.toFixed(2),
      annualizedGross: annualizedGross.toFixed(2),
      annualGross: annualGross.toFixed(2),
      ctcBeforeGratuity: ctcBeforeGratuity.toFixed(2),
      ctc: totalCTC.toFixed(2)
    }, { emitEvent: false }); // Prevent infinite loop
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = { ...this.employeeForm.getRawValue() };
  
      // Convert date fields to DD/MM/YYYY format
      formData.offerDate = this.formatDate(formData.offerDate);
      formData.joiningDate = this.formatDate(formData.joiningDate);
      formData.acceptanceDate = this.formatDate(formData.acceptanceDate);
  
      const formattedData = JSON.stringify(formData);
      this.router.navigate(['/dashboard/report/olp'], { queryParams: { data: formattedData } });
    } else {
      alert('Please fill all required fields.');
    }
  }
  
  // Function to format dates as DD/MM/YYYY
  formatDate(date: string | Date): string {
    if (!date) return ''; // Handle empty case
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
}
