import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {axiosInstance} from "@/api/QueryClient.ts";
import {Endpoints} from "@/api/Endpoints.types.ts";
import {CurrentUserApiResponse} from "@/ts/interface/User.ts";

export const useGetCurrentUserInfo = () => {
    return useQuery<CurrentUserApiResponse, AxiosError>({
        queryKey: ['currentUserInfo'],
        queryFn: async () => {
            const res = await axiosInstance.get(Endpoints.CURRENT_USER_INFO);

            return res.data;
        }, enabled: false
    });
};