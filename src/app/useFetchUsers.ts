import { useEffect, useRef, useState } from "react"
import { USER } from "./user.types"
import { GET_USERS } from "./api.constants"
import { interPolateString } from "./utils";


export const useFetchUsers = () => {
    const observer = useRef<any>();
    const [loader, setLoader] = useState<boolean>(true);
    const [users, setUsers] = useState<USER[]>([]);
    const [limit, setLimit] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const getUsers = async (pageCount: number) => {
        setLoader(true);
        try {
            const userResponse = await fetch(
                interPolateString(
                    GET_USERS,
                    pageCount.toString()
                ));

            const userData = await userResponse.json();
            if (userData.length) {
                if (userData.length < 30) {
                    setLimit(true);
                }
                setUsers(prev => [...prev, ...userData]);
            } else {
                setLimit(true);
            }
        } catch (error) {
            console.log(error);
        }
        setLoader(false);
    }

    useEffect(() => {
        getUsers(page);
    }, []);

    const lastItemRef = (node: any) => {
        if (loader) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !limit) {
                const pageCount = page + 1;
                getUsers(pageCount);
                setPage(pageCount);
            }
        });

        if (node) observer.current.observe(node);
    };

    return { users, loader, lastItemRef }
}