import Swal from "sweetalert2";
export const setAlert = (
    icon: any,
    title: string,
    text: string,
    confirmButtonText: string,
    timer: number = 3000
) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmButtonText,
    });

}