
import { format, parse, parseISO, getDay } from 'date-fns';
import { toast } from 'vue3-toastify'
import * as XLSX from "xlsx";




declare module '#app' {
    interface NuxtApp {
        $username: () => string;
        $password: () => string;
        $joi: typeof Joi;
        $toast: toast;
        $datefns: {
            format: typeof format;
            parse: typeof parse;
            parseISO: typeof parseISO;
            getDay: typeof getDay;
        };
        $echarts: typeof echarts;
        $xlsx: typeof XLSX;
    }
}

