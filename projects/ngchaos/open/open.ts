import { Injectable } from "@angular/core";
import { ChaosUtils } from "ngchaos/core";
import { ChaosDatabase } from "ngchaos/db";


export interface CUserNotification {
  uid: string|string[];
  title: string;
  message: string;
  from: string;
}

export interface CBranchNotification {
  branchCode: string|string[];
  positionCode?: string;
  title: string;
  message: string;
  from: string;
}

@Injectable({ providedIn: 'root' })
export class COpenService extends ChaosDatabase<any> {
  override get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.uri.endpoint, "api/open");
  }
  
  /**
   * ข้อมูลบุคลากร
   */
  getStaff<R>() {
    return this.call<R>({ 
      type: "GET_STAFF"
    });
  }
  
  /**
   * ข้อมูลบุคลากรด้วย User ID
   */
  getStaffByUid<R>(uid: string) {
    return this.call<R>({ 
      type: "GET_STAFF_BY_UID", 
      data: { uid: uid } 
    });
  }
  
  /**
   * ข้อมูลบุคลากรแยกด้วย Branch Id
   */
  getStaffByBranchId<R>(branchId: string) {
    return this.call<R>({ 
      type: "GET_STAFF_BY_BRANCH_ID", 
      data: { branchId } 
    });
  }
  
  /**
   * ข้อมูลบุคลากรแยกด้วย Branch Code
   */
  getStaffByBranchCode<R>(branchCode: string) {
    return this.call<R>({ 
      type: "GET_STAFF_BY_BRANCH_CODE", 
      data: { branchCode } 
    });
  }
  
  /**
   * ข้อมูลบุคลากรแยกด้วย Position Code
   */
  getStaffByPositionCode<R>(positionCode: string) {
    return this.call<R>({ 
      type: "GET_STAFF_BY_POSITION_CODE", 
      data: { positionCode } 
    });
  }
  
  /**
   * ข้อมูลตำแหน่งงาน
   */
  getStaffPosition<R>() {
    return this.call<R>({ 
      type: "GET_STAFF_POSITION"
    });
  }
  
  /**
   * ข้อมูลกลุ่มตำแหน่งงาน
   */
  getStaffPositionGroup<R>() {
    return this.call<R>({ 
      type: "GET_STAFF_POSITION_GROUP"
    });
  }
  
  /**
   * ข้อมูลกรรมการ
   */
  getCommittee<R>() {
    return this.call<R>({ 
      type: "GET_COMMITTEE"
    });
  }
  
  /**
   * ข้อมูลกรรมการ
   */
  getCommitteePosition<R>() {
    return this.call<R>({ 
      type: "GET_COMMITTEE_POSITION"
    });
  }
  
  /**
   * ข้อมูลกรรมการแยกด้วย Branch Code
   */
  getCommitteeByBranchCode<R>(branchCode: string) {
    return this.call<R>({ 
      type: "GET_COMMITTEE_BY_BRANCH_CODE", 
      data: { branchCode } 
    });
  }
  
  /**
   * ข้อมูลงบประมาณเหล่ากิ่ง
   */
  getFinanceByBranch<R>(branchId: string, year: number) {
    return this.call<R>({ 
      type: "GET_FINANCE_BY_BRANCH", 
      data: {
        year: year,
        branch_id: branchId
      }
    });
  }
  
  /**
   * ส่งแจ้งเตือนผู้ใช้งาน
   */
  notifyUser<R>(data: CUserNotification) {
    return this.call<R>({ 
      type: "NOTIFY_USER", 
      data: data
    });
  }
  
  /**
   * ส่งแจ้งเตือนตามหน่วยงาน
   */
  notifyBranch<R>(data: CBranchNotification) {
    return this.call<R>({ 
      type: "NOTIFY_BRANCH", 
      data: data
    });
  }
  
   
}