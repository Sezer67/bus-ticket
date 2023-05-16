import { BuyTicketResponseDataType } from "../../service/types/service-service.type";
import { ServiceType } from "../../types/service.type";
import { formattedDate } from "./date.helper";

export const renderHtmlForTicket = (service: ServiceType, passengerInfo: BuyTicketResponseDataType[],price: number) => {
    let passengerInformationHtml = "";
    let serviceInformationHtml = "";
    
    passengerInfo.forEach((info) => {
        passengerInformationHtml += `
            <div style=' display:flex; flexDirection:row; justifyContent:space-between; '>
                <p style='textAlign:left; width:40%'>${info.fullName}</p>
                <p style='textAlign:left; width:35%'>${info.seatNumber}</p>
                <p style='textAlign:left; width:25%'>${price}</p>
            </div>
        `
    });
    serviceInformationHtml = `
        <div style=' display:flex; flexDirection:row; alignItems:center; '>
            <h6 style='width: 100px; fontSize:14px; margin:0;'>From</h6>
            <p>${service.departureCity}</p>
        </div>
        <div style=' display:flex; flexDirection:row; alignItems:center; '>
            <h6 style='width: 100px; fontSize:14px; margin:0;'>To</h6>
            <p>${service.arrivalCity}</p>
        </div>
        <div style=' display:flex; flexDirection:row; alignItems:center; '>
            <h6 style='width: 100px; fontSize:14px; margin:0;'>Date</h6>
            <p style='maxWidth: 200px'>${formattedDate(new Date(service.departureDate),"Day Month Date HH:mm")} - ${formattedDate(new Date(service.arrivalDate),"Day Month Date HH:mm")}</p>
        </div>
        <div style=' display:flex; flexDirection:row; alignItems:center; '>
            <h6 style='width: 100px; fontSize:14px; margin:0;'>Route</h6>
            <p style='maxWidth: 200px'>${service.route}</p>
        </div>
    `;
    const result = `
        <div>
            <div style=' display:flex; flexDirection:row; justifyContent:space-between; alignItems:center; width:100% '>
                <p>${service.companyName}</p>
                <p style=' fontWeight:700; fontSize:14 '>Take A Trip</p>
            </div>
            <div>
                <div>
                    <h4 style='marginBottom:6px; paddingBottom:0; textAlign:center;'>Passenger Informations</h4>
                    <div style=' height: 1px; backgroundColor: #ddd;' />
                </div>
                <div style=' display:flex; flexDirection:row; justifyContent:space-between; borderBottomWidth:1px; '>
                    <p style='textAlign:left; width:40%'>Full Name</p>
                    <p style='textAlign:left; width:35%'>Seat Number</p>
                    <p style='textAlign:left; width:25%'>Price</p>
                </div>
                <div>${passengerInformationHtml}</div>
                <div>
                    <h4 style='marginBottom:6px; paddingBottom:0; textAlign:center; '>Service Informations</h4>
                    <div style=' height: 1px; backgroundColor: #ddd;' />
                </div>
                <div>${serviceInformationHtml}</div>
                <div>
                    <p style=' fontSize: 14px; fontWeight:700; textAlign:right;'>Total:  ${price * passengerInfo.length} ₺</p>
                </div>
            </div>
        </div>  
    `;

    return result;

}