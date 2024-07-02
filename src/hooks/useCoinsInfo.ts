import useData from './useData';

export interface CoinInfo{
    id: number
    logo: string
}

const useCoins = () => {
    return useData<CoinInfo>(
        "/v2/cryptocurrency/info",
    )
}

export default useCoins

