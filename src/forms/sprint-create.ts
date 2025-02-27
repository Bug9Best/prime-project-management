import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm, InputAppFormType } from "../components/app-form/app-form.component";
export var FormGroupSprintCreate = new FormGroup({
    sprint_name: new FormControl(null, [Validators.required]),
    sprint_description: new FormControl(null),
    start_date: new FormControl(null, [Validators.required]),
    end_date: new FormControl(null, [Validators.required]),
});

export var listFormSprintCreate: InputAppForm[] = [
    {
        type: InputAppFormType.Text,
        label: "form.sprint.name",
        field: "sprint_name",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.Textarea,
        label: "form.sprint.description",
        field: "sprint_description",
        required: false,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.Date,
        label: "form.sprint.startDate",
        field: "start_date",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.Date,
        label: "form.sprint.endDate",
        field: "end_date",
        required: true,
        disabled: false,
        colWidth: 12,
    },
]