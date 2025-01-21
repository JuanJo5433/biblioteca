import { getConstants } from "@/utils/constans";

export const getIpPublicClient = async () => {
    const { ipifyApiUrl } = getConstants();

    const response = await fetch(ipifyApiUrl);
    const data = await response.json();

    return data.ip;
};
