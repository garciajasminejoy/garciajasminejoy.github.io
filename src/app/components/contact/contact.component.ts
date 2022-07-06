import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nyx-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitted!: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitContactForm(): void {
    if (!this.contactForm.valid) {
      console.error('Invalid form.');
      return;
    }
    this.isSubmitted = true;
  }

  get firstName(): AbstractControl {
    return this.contactForm.controls['firstName'];
  }

  get lastName(): AbstractControl {
    return this.contactForm.controls['lastName'];
  }

  get email(): AbstractControl {
    return this.contactForm.controls['email'];
  }

  get title(): AbstractControl {
    return this.contactForm.controls['title'];
  }

  get message(): AbstractControl {
    return this.contactForm.controls['message'];
  }

}
