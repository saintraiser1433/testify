import { customAlphabet } from "nanoid";
import Joi from 'joi'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { CircleProgressBar } from 'circle-progress.vue';
import { toast, type ToastOptions } from 'vue3-toastify';
import { format, parse, parseISO, getDay } from 'date-fns'
import * as echarts from 'echarts';
export default defineNuxtPlugin((nuxtApp) => {
    const nanoid = customAlphabet("1234567890abcdef", 5);
    const password = () => {
        return nanoid();
    }

    //use
    nuxtApp.vueApp.use(Vue3Toastify, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
    } as ToastContainerOptions);


    //provide
    nuxtApp.provide('password', password);
    nuxtApp.provide('joi', Joi);
    nuxtApp.provide('toast', toast)
    nuxtApp.provide('datefns', {
        format,
        parse,
        parseISO,
        getDay,
    });
    nuxtApp.provide('echarts', echarts);

    //component
    nuxtApp.vueApp.component('CircleProgressBar', CircleProgressBar)



})