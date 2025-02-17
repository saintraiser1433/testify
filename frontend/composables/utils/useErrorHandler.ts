
export const useErrorHandler = () => {
    const { $toast } = useNuxtApp();

    const handleApiError = (error: any) => {
        if (error.data && Array.isArray(error.data.details)) {
            error.data.details.forEach((message:string) => {
                $toast.error(message)
            });
           
        } else {
            $toast.error(error.data.message)
        }
    };

    return { handleApiError };
};