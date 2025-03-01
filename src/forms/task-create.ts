import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm, InputAppFormType } from "../components/app-form/app-form.component";
export var FormGroupTaskCreate = new FormGroup({
    task_name: new FormControl(null, [Validators.required]),
});

export var listFormTaskCreate: InputAppForm[] = [
    {
        type: InputAppFormType.Text,
        label: "form.task.name",
        field: "task_name",
        required: true,
        disabled: false,
        colWidth: 12,
    },
]