import { format } from "date-fns";
import { DATE_FORMAT } from "../constants/common";

export const formatDate = (dateValue: Date | string | number) =>{
    return format(new Date(dateValue), DATE_FORMAT);
}