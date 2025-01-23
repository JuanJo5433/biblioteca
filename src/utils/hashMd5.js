import md5 from "md5";

export const hashMd5 = (string) => {

    const stringToHash = md5(string);
    return stringToHash;
}