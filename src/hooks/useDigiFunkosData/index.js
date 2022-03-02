import {useState,useEffect,useCallback} from 'react';
import useDigiFunkos from '../useDigiFunkos'
import {useWeb3React} from '@web3-react/core';

const getFunkoData = async ({ digiFunkos, tokenId }) => {
    const [
        tokenURI,
        dna,
        owner,
      ] = await Promise.all([
        digiFunkos.methods.tokenURI(tokenId).call(),
        digiFunkos.methods.tokenDNA(tokenId).call(),
        digiFunkos.methods.ownerOf(tokenId).call(),
      ]);

    const [
        accessoriesType,
        clotheColor,
        clotheType,
        eyeType,
        eyeBrowType,
        facialHairColor,
        facialHairType,
        hairColor,
        hatColor,
        graphicType,
        mouthType,
        skinColor,
        topType,
      ] = await Promise.all([
        digiFunkos.methods.getAccessoriesType(dna).call(),
        digiFunkos.methods.getClotheColor(dna).call(),
        digiFunkos.methods.getClotheType(dna).call(),
        digiFunkos.methods.getEyeType(dna).call(),
        digiFunkos.methods.getEyeBrowType(dna).call(),
        digiFunkos.methods.getFacialHairColor(dna).call(),
        digiFunkos.methods.getFacialHairType(dna).call(),
        digiFunkos.methods.getHairColor(dna).call(),
        digiFunkos.methods.getHatColor(dna).call(),
        digiFunkos.methods.getGraphicType(dna).call(),
        digiFunkos.methods.getMouthType(dna).call(),
        digiFunkos.methods.getSkinColor(dna).call(),
        digiFunkos.methods.getTopType(dna).call(),
    ]);
  
    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();
  
    return {
      tokenId,
      attributes: {
        accessoriesType,
        clotheColor,
        clotheType,
        eyeType,
        eyeBrowType,
        facialHairColor,
        facialHairType,
        hairColor,
        hatColor,
        graphicType,
        mouthType,
        skinColor,
        topType,
      },
      tokenURI,
      dna,
      owner,
      ...metadata,
    };
  };


// Plural
const useDigiFunkosData = ({ owner = null } = {}) => {
  const [funkos, setFunkos] = useState([]);
  const { library } = useWeb3React();
  const [isLoading, setLoading] = useState(true);
  const digiFunkos = useDigiFunkos();

  const update = useCallback(async () => {
    if (digiFunkos) {
      setLoading(true);

      let tokenIds;

      if (!library.utils.isAddress(owner)) {
        const totalSupply = await digiFunkos.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => index);
      } else {
        const balanceOf = await digiFunkos.methods.balanceOf(owner).call();

        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) =>
            digiFunkos.methods.tokenOfOwnerByIndex(owner, index).call()
          );

        tokenIds = await Promise.all(tokenIdsOfOwner);
      }

      const FunkosPromise = tokenIds.map((tokenId) =>
        getFunkoData({ tokenId, digiFunkos })
      );

      const funkos = await Promise.all(FunkosPromise);

      setFunkos(funkos);
      setLoading(false);
    }
  }, [digiFunkos, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    isLoading,
    funkos,
    update,
  };
};

// Singular
const useDigiFunkoData = (tokenId = null) => {
  const [funko, setFunko] = useState({});
  const [isLoading, setLoading] = useState(true);
  const digiFunkos = useDigiFunkos();

  const update = useCallback(async () => {
    if (digiFunkos && tokenId != null) {
      setLoading(true);

      const toSet = await getFunkoData({ tokenId, digiFunkos });
      setFunko(toSet);

      setLoading(false);
    }
  }, [digiFunkos, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    isLoading,
    funko,
    update,
  };
};
export {useDigiFunkosData,useDigiFunkoData};