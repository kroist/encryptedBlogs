export const getNfts = ()=>{
    if(!localStorage.getItem("nft_possesion"))return [];
    try{
        let arr = JSON.parse(localStorage.getItem("nft_possesion"));
        return arr;
    }catch(error){
        return [];
    }
}

export const getNftByContract = (contract) => {
    const nfts = getNfts();
    let list_of_nfts : any[] = [];
    for(let i = 0 ;i < nfts.length; i++){
        if(nfts[i].contract == contract){
            list_of_nfts.push(nfts[i]);
        }
    }
    return list_of_nfts;
}
export const getAvailableBlogAdresses = ()=>{
    const addressSet = new Set();
    const nfts = getNfts();
    let list_of_nfts = [];
    for(let i = 0 ;i < nfts.length; i++){
        addressSet.add(nfts[i].contract);
    }
    return [...addressSet];
}
export const addNft = (contract , nft)=>{
    let nfts = getNfts();
    nfts.push({
        contract : contract,
        nft: Number(nft)
    });
    localStorage.setItem("nft_possesion" , JSON.stringify(nfts));
}