import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm } from "../components/app-form/app-form.component";

export var FormGroupProjectCreate = new FormGroup({
    project_name: new FormControl(null, [Validators.required]),
    project_description: new FormControl(null),
    project_privacy_type: new FormControl('PRIVATE', [Validators.required]),
    project_type: new FormControl(null, [Validators.required]),
});

export var FormGroupProjectCreateErrors = {
    project_name: '',
    project_type: '',
}

export var FormGroupProjectCreateMessages = {
    project_name: {
        required: 'Project name is required',
    },
    project_type: {
        required: 'Project type is required',
    },
}

export var listFormProjectCreate: InputAppForm[] = [
    {
        type: "text",
        label: "FORM_PROJECT_NAME",
        field: "project_name",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: "textarea",
        label: "FORM_PROJECT_DESCRIPTION",
        field: "project_description",
        required: false,
        disabled: false,
        colWidth: 12,
    },
    {
        type: "toggle",
        label: "FORM_PROJECT_PRIVACY_TYPE",
        field: "project_privacy_type",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: "project_type",
        label: "FORM_PROJECT_TYPE",
        field: "project_type",
        required: true,
        disabled: false,
        colWidth: 12,
    },
]