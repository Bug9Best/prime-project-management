import { NgModule } from "@angular/core";
import { ChaosPage } from "ngchaos/page";
import { ChaosStat } from "ngchaos/stat";
import { ChaosDialog } from "ngchaos/dialog";
import { ChaosMenubar } from "ngchaos/menubar";
import { ChaosTemplateDirective, ChaosThaiCalendarDirective, ChaosThaiCardPipe, ChaosThaiDatePipe } from "ngchaos/directive";
import { ChaosTable, ChaosTableFieldDirective } from "ngchaos/table";
import { ChaosPanel, ChaosPanelBody, ChaosPanelFooter, ChaosPanelHeader, ChaosPanelToolbar } from "ngchaos/panel";
import { ChaosToolbar, ChaosLoading, ChaosMessage, ChaosTitle, ChaosUser, ChaosBody } from "ngchaos/components";

@NgModule({
  imports: [
    ChaosTableFieldDirective,
    ChaosThaiCalendarDirective,
    ChaosTemplateDirective,
    ChaosThaiCardPipe,
    ChaosThaiDatePipe,
    ChaosPage,
    ChaosStat,
    ChaosDialog,
    ChaosMenubar,
    ChaosTable,
    ChaosPanel,
    ChaosPanelHeader,
    ChaosPanelToolbar,
    ChaosPanelBody,
    ChaosPanelFooter,
    
    // Components
    ChaosMessage,
    ChaosTitle,
    ChaosUser,
    ChaosToolbar,
    ChaosLoading,
    ChaosBody,
  ],
  exports: [
    ChaosTableFieldDirective,
    ChaosThaiCalendarDirective,
    ChaosTemplateDirective,
    ChaosThaiCardPipe,
    ChaosThaiDatePipe,
    ChaosPage,
    ChaosStat,
    ChaosDialog,
    ChaosMenubar,
    ChaosTable,
    ChaosPanel,
    ChaosPanelHeader,
    ChaosPanelToolbar,
    ChaosPanelBody,
    ChaosPanelFooter,
    
    // Components
    ChaosMessage,
    ChaosTitle,
    ChaosUser,
    ChaosToolbar,
    ChaosLoading,
    ChaosBody,
  ]
})
export class ChaosThemeModule {}
