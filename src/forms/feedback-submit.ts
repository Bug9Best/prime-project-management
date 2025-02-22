import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm } from "../components/app-form/app-form.component";

export var FormGroupFeedbackSubmit = new FormGroup({
    content: new FormControl(null, [Validators.required]),
});

export var listFormFeedbackSubmit: InputAppForm[] = [
    {
        type: "textarea",
        label: "form.feedback.content",
        field: "content",
        required: true,
        disabled: false,
        colWidth: 12,
        isLimitLength: true,
        maxLength: 255,
    },
]