import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerService, Partner } from '../partner-list/service/partner.service';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css'],
  standalone: false // ✅ Ensure it's part of an Angular module
})
export class PartnerListComponent implements OnInit {
  partners: Partner[] = [];
  selectedPartner: Partner | null = null;
  partnerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private partnerService: PartnerService
  ) {
    this.partnerForm = this.fb.group({
      partnerId: [''],
      partnerName: [''],
      partnerEmail: [''],
      contactPerson: [''],
      contactNumber: [''],
      address: [''],
      status: ['Active'] // ✅ Default status
    });
  }

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getPartners().subscribe({
      next: (partners: Partner[]) => {
        console.log('Fetched Partners:', partners);
        this.partners = partners; // ✅ Ensure data matches Partner[]
      },
      error: (err) => {
        console.error('Error fetching partners:', err);
        this.partners = [];
      }
    });
  }

  selectPartner(partner: Partner) {
    this.selectedPartner = partner;
    this.partnerForm.patchValue({ ...partner });
  }

  onSubmit() {
    const formValue = this.partnerForm.value;
    const updatedPartner: Partner = { ...formValue };

    console.log('Updated Partner Data:', updatedPartner);
  }

  viewPartner(partner: Partner | null): void {
    if (partner) {
      this.router.navigate(['/dashboard/master/partner-form'], { 
        queryParams: { 
          partnerId: partner.partnerId,
          partnerName: partner.partnerName,
          partnerEmail: partner.partnerEmail,
          contactPerson: partner.contactPerson,
          contactNumber: partner.contactNumber,
          address: partner.address,
          status: partner.status
        }
      });
    } else {
      this.router.navigate(['/dashboard/master/partner-form']);
    }
  }

  addNewPartner(): void {
    this.router.navigate(['/dashboard/master/partner-form']);
  }
}
