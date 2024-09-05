import i18next from "i18next";
import data from '@/assets/languages/en.json'
export  type i18Keys = keyof typeof data;

export const FM = (id: i18Keys, value?: any) => {
    return i18next.t(id, value);
}