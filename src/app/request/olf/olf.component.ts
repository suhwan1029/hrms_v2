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
  public titleList: string[] = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Prof.'];

  constructor(private fb: FormBuilder, private router: Router) { 
   
    this.employeeForm = this.fb.group({
      title: [''],  // Bind title to a form control, not an array
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
  
      // Convert date fields only if they exist
      formData.offerDate = formData.offerDate ? this.formatDateToText(formData.offerDate) : '';
      formData.joiningDate = formData.joiningDate ? this.formatDateToText(formData.joiningDate) : '';
      formData.acceptanceDate = formData.acceptanceDate ? this.formatDateToText(formData.acceptanceDate) : '';
  
      const formattedData = JSON.stringify(formData);
      this.router.navigate(['/dashboard/report/olp'], { queryParams: { data: formattedData } });
    } else {
      alert('Please fill all required fields.');
    }
  }
  
  formatDateToText(dateStr: string): string {
    if (!dateStr) return ''; // Handle empty case
  
    // Check if input is already a valid date object
    let date: Date;
    if (typeof dateStr === 'string' && dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/').map(Number);
      date = new Date(year, month - 1, day); // Months are 0-based
    } else {
      date = new Date(dateStr);
    }
  
    if (isNaN(date.getTime())) return ''; // Handle invalid date case
  
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  
}
