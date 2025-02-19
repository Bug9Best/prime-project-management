import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm } from "../components/app-form/app-form.component";

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
        type: "text",
        label: "FORM_CUSTOMER_NAME",
        field: "customer_name",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: "text",
        label: "FORM_CUSTOMER_EMAIL",
        field: "customer_email",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: "text",
        label: "FORM_CUSTOMER_PHONE",
        field: "customer_phone",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: "date",
        label: "FORM_CUSTOMER_EMPLOY_START",
        field: "employ_start_date",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: "date",
        label: "FORM_CUSTOMER_EMPLOY_END",
        field: "employ_end_date",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: "textarea",
        label: "FORM_CUSTOMER_ADDRESS",
        field: "customer_address",
        required: false,
        disabled: false,
        colWidth: 12,
    },
]