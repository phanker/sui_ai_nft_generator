
import Spinner from "react-bootstrap/Spinner";
import {useState, useEffect} from 'react';
import {NFTStorage, File} from 'nft.storage'
import {Buffer} from 'buffer';
import axios from 'axios';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import NFT from "../constants/NFT.json";
const CreateNft = () => {


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [url, setURL] = useState(null)

    const [message, setMessage] = useState("")
    const [isWaiting, setIsWaiting] = useState(false)
    const currentAccount  = useCurrentAccount();
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(currentAccount)
        /**
         *
         *
         * {
         *     "address": "0x2f67c731ca840283e2221f47c3144df118f5567917a6c8abe7694015a54348bb",
         *     "chains": [
         *         "sui:mainnet"
         *     ],
         *     "features": [
         *         "standard:connect",
         *         "standard:events",
         *         "sui:signAndExecuteTransaction"
         *     ]
         * }
         */
        if(!currentAccount){
            window.alert("Please connect your wallet!")
            return
        }
        if (name === "" || description === "") {
            window.alert("Please provide a name and description")
            return
        }

        setIsWaiting(true)

        // Call AI API to generate a image based on description
        const imageData = await createImage()

        // Upload image to IPFS (NFT.Storage)
        const url = await uploadImage(imageData)

        // Mint NFT
        await mintImage(url)

        setIsWaiting(false)
        setMessage("")
    }

    const createImage = async () => {
        setMessage("Generating Image...")

        // You can replace this with different model API's
        const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0`

        // Send the request
        const response = await axios({
            url: URL,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                inputs: description, options: {wait_for_model: true},
            }),
            responseType: 'arraybuffer',
        })

        const type = response.headers['content-type']
        const data = response.data

        const base64data = Buffer.from(data).toString('base64')
        const img = `data:${type};base64,` + base64data // <-- This is so we can render it on the page
        setImage(img)

        return data
    }

    const uploadImage = async (imageData) => {
        setMessage("Uploading Image...")

        // Create instance to NFT.Storage
        const nftstorage = new NFTStorage({token: process.env.REACT_APP_NFT_STORAGE_API_KEY})

        // Send request to store image
        const {ipnft,url,data} = await nftstorage.store({
            image: new File([imageData], "image.jpeg", {type: "image/jpeg"}),
            name: name,
            description: description,
        })
        console.log(data)
        console.log(data.image.pathname)
        // Save the URL
        const matedata_url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
        const path_url =data.image.pathname.replace("//","");
        const images_url = `https://ipfs.io/ipfs/${path_url}`
        console.log(images_url)
        // https://ipfs.io/ipfs/bafybeiflhhk2xx5autae7ibc3y3ugfsa6pzylushm4ugwj77totb4p6224/image.jpeg
        setURL(images_url)

        return matedata_url
    }

    const mintImage = async (tokenURI) => {
        setMessage("Waiting for Mint...")


        const txb = new TransactionBlock();
        txb.moveCall({
            arguments: [txb.pure(name), txb.pure(description), txb.pure(url)] ,
            target: `${NFT.PACKAGE_ID}::${NFT.MODULE_NAME}::${NFT.MINT_FUNCTION}`,
        });

        signAndExecute(
            {
                transactionBlock: txb,
                options: {
                    // We need the effects to get the objectId of the created counter object
                    showEffects: true,
                },
            },
            {
                onSuccess: (tx) => {
                    console.log("onSuccess ...");
                    // The first created object in this TransactionBlock should be the new Counter
                    const objectId = tx.effects?.created?.[0]?.reference?.objectId;
                    if (objectId) {
                        console.log(objectId);
                        // props.onCreated(objectId);
                    }
                },
            },
        )




    }



    return (
        <div>
            <div className='form'>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="Create a name..." onChange={(e) => {
                        setName(e.target.value)
                    }}/>
                    <input type="text" placeholder="Create a description..."
                           onChange={(e) => setDescription(e.target.value)}/>
                    <input type="submit" value="Create & Mint"/>
                </form>
                <div className="image">
                    {!isWaiting && image ? (
                        <img src={image} alt="AI generated image"/>
                    ) : isWaiting ? (
                        <div className="image__placeholder">
                            <Spinner animation="border"/>
                            <p>{message}</p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {!isWaiting && url && (
                <p>
                    View&nbsp;<a href={url} target="_blank" rel="noreferrer">Metadata</a>
                </p>
            )}
        </div>
    );
}

export default CreateNft;