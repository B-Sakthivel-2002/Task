export interface equipment {
    // equipmentId:number,
    equipmentNo:string,
    equipmentSize:number|undefined,
    equipmentLinerId:string,
    depotId:string,
    conTrackingNo:string,
    gateInDateTime:any,
    ReferenceNo:string
}


export interface transport {
    // transportId:number,
    transportCompany:string
    licenseNo:string,
    driverName:string
    driverMobileNo:number|undefined
    driverEmail:string
}

export interface business{
    linerId:string,
    linerCode: string
}
export interface depot{
    depotId: string,
    depotCode:string 
}
