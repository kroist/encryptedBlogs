
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {BIN_ID}  from './publicPreview.tsx'
import { useSDK } from "@metamask/sdk-react-ui";

function useCustomSDK(){
    const { sdk, connected, connecting, provider, chainId, ready } = useSDK();


    const changeChain = async () => {
      if(provider == undefined){
        console.log("FUCK UNDEFINED");
      }
      try {
        await provider?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1F49' }],
        })
      } catch (switchError: any) {
        console.log(" meta mask error ")
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider?.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x1F49',
                  chainName: 'Zama Network',
                  rpcUrls: ['https://devnet.zama.ai'],
                  blockExplorerUrls: ['https://main.explorer.zama.ai'],
                  nativeCurrency: {
                    decimals: 18,
                    name: 'ZAMA',
                    symbol: 'ZAMA',
                  },
                },
              ],
            })
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
  }
    
  useEffect(()=>{

    changeChain();

  }, []);

  return {
    sdk : sdk,
    connected : connected,
    connecting : connecting,
    provider : provider,
    chainId : chainId,
    ready : ready
  }
}

export default useCustomSDK;