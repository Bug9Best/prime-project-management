/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */
import { NgModule } from "@angular/core";
import { ChaosPrint } from "./chaos-print.component";
import { ChaosPrintDirective } from "./chaos-print.directive";
import { PrintSignature } from "./components/cp-signature";
import { ChaosPrintToolbar } from "./chaos-print-toolbar";
import { PrintTitle } from "./components/cp-title";
import { PrintTextBlock } from "./components/cp-text-block";
import { PrintDivider } from "./components/cp-divider";

@NgModule({
  imports: [
    ChaosPrint,
    ChaosPrintDirective,
    ChaosPrintToolbar,
    PrintTitle,
    PrintTextBlock,
    PrintDivider,
    PrintSignature
  ],
  exports: [
    ChaosPrint,
    ChaosPrintDirective,
    ChaosPrintToolbar,
    PrintTitle,
    PrintTextBlock,
    PrintDivider,
    PrintSignature
  ],
})
export class ChaosPrintModule {}