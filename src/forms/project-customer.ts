import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm, InputAppFormType } from "../components/app-form/app-form.component";

export var FormGroupProjectCustomer = new FormGroup({
    customer_name: new FormControl(null, [Validators.required]),
    customer_email: new FormControl(null, [Validators.required]),
    customer_phone: new FormControl(null, [Validators.required]),
    employ_start_date: new FormControl(null, [Validators.required]),
    employ_end_date: new FormControl(null, [Validators.required]),
    customer_address: new FormControl(null,),
});

export var listFormProjectCustomer: InputAppForm[] = [
    {
        type: InputAppFormType.Text,
        label: "form.customer.name",
        field: "customer_name",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.Text,
        label: "form.customer.email",
        field: "customer_email",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.Text,
        label: "form.customer.phone",
        field: "customer_phone",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.StartDate,
        label: "form.customer.employStart",
        field: "employ_start_date",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.EndDate,
        label: "form.customer.employEnd",
        field: "employ_end_date",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.Textarea,
        label: "form.customer.address",
        field: "customer_address",
        required: false,
        disabled: false,
        colWidth: 12,
    },
]