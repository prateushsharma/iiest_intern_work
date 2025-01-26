import React, { useState, useEffect } from "react";
import axios from "axios";
import { connectWallet } from './ConnectWallet';
import ABI from './ABI';
import { ethers } from "ethers";
import {CONTRACT_ADDRESS} from "./ContractAddress";
const connectWalletAndUpload = async (ImgHash, account, name, customValue, Time, Genre) => {
  const signer = await connectWallet();
  if (signer) {
    const contractAddress = CONTRACT_ADDRESS; // Replace with your contract address
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    try {
      await contract.uploadVideo(ImgHash, account, name, customValue, Time, Genre);
      console.log('Successfully uploaded');
    } catch (error) {
      console.error('Error uploading:', error);
    }
  }
}

const Upload = () => {
  const [account, setAccount] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No video selected");
  const [name, setName] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const getAccount = async () => {
      const signer = await connectWallet();
      if (signer) {
        const account = await signer.getAddress();
        setAccount(account);
      }
    };
    getAccount();
  }, []);

  const handleSubmit = async (e) => {
    console.log("Inside Handle Submit");
    e.preventDefault();
    if (file && name && customValue && genre) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("pinataMetadata", JSON.stringify({
          name: name,
          keyvalues: {
            description: customValue,
            address: account,
            time: new Date().toLocaleString(),
            genre: genre
          }
        }));

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `daf9668748794b12e3a7`,
            pinata_secret_api_key: `ea807deebc00597b252babb7604d2d3d90698dfb330743ae24b7d36a37c50cf2`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        const Time = Math.floor(Date.now() / 1000); // Current time in seconds since Unix epoch
        await connectWalletAndUpload(ImgHash, account, name, customValue, Time, genre);

        alert("Successfully Video Uploaded");
        console.log(ImgHash);
        setFileName("No Video selected");
        setFile(null);
        setName("");
        setCustomValue("");
        setGenre("");
      } catch (e) {
        console.error('Error uploading file:', e);
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="container mt-5">
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Select Image</label>
          <input 
            type="file" 
            className="form-control" 
            id="file" 
            onChange={retrieveFile}
          />
          <div id="fileHelp" className="form-text">Please select an image file to upload.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="fileName" className="form-label">File Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="fileName" 
            placeholder="Enter file name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea 
            className="form-control" 
            id="description" 
            rows="3" 
            placeholder="Enter description"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Genre</label>
          <select 
            className="form-select" 
            id="genre" 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select genre...</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Music">Music</option>
            <option value="Drama">Drama</option>
            <option value="Tech">Tech</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
            <option value="News">News</option>
          
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="walletAddress" className="form-label">Wallet Address</label>
          <input 
            type="text" 
            className="form-control" 
            id="walletAddress" 
            placeholder={account} 
            value={account || ''}
            readOnly
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Upload;
